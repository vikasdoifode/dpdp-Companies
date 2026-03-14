import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { api, setToken, getToken } from "@/lib/api";

export interface CompanyProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  domain: string;
  contactEmail: string;
  apiKey: string;
  industry: string;
  registrationNumber: string;
  createdAt: string;
}

export interface ComplianceRecord {
  id: string;
  type: string;
  label: string;
  description: string;
  compliant: boolean;
  updatedAt: string;
}

export interface ActivityEntry {
  id: string;
  type: "login" | "compliance_update" | "data_modification" | "audit" | "consent_update";
  description: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

interface AuthState {
  isAuthenticated: boolean;
  company: CompanyProfile | null;
  compliance: ComplianceRecord[];
  activities: ActivityEntry[];
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  demoLogin: () => void;
  register: (data: { name: string; email: string; password: string; industry: string; companyName?: string; domain?: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<CompanyProfile>) => Promise<void>;
  updateCompliance: (complianceId: string, compliant: boolean) => void;
  refreshActivities: () => Promise<void>;
  refreshComplianceReport: () => Promise<{ report: Record<string, unknown> } | null>;
  requestDataExport: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MongoDoc = Record<string, any>;

const normalizeActivity = (a: MongoDoc): ActivityEntry => ({
  id: a._id || a.id,
  type: a.type || "audit",
  description: a.description || a.details || "",
  timestamp: a.timestamp || a.createdAt || new Date().toISOString(),
  metadata: a.metadata,
});

const normalizeCompanyProfile = (user: MongoDoc, company: MongoDoc | null): CompanyProfile => ({
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  phone: user.phone || "",
  companyName: company?.companyName || user.name,
  domain: company?.domain || "",
  contactEmail: company?.contactEmail || user.email,
  apiKey: company?.apiKey || "",
  industry: company?.industry || "",
  registrationNumber: company?.registrationNumber || "",
  createdAt: user.createdAt || new Date().toISOString(),
});

// Default DPDP compliance checklist for companies (client-side, as backend tracks events differently)
const DEFAULT_COMPLIANCE: ComplianceRecord[] = [
  {
    id: "cr1",
    type: "data_collection",
    label: "Data Collection Notice",
    description: "Display clear notice to data principals before collecting personal data as per DPDP Act Section 5.",
    compliant: false,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cr2",
    type: "processing_policy",
    label: "Data Processing Policy",
    description: "Maintain a published data processing policy with purpose limitation and data minimization principles.",
    compliant: false,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cr3",
    type: "breach_notification",
    label: "Breach Notification Process",
    description: "Establish process to notify the Data Protection Board and affected data principals within 72 hours of a breach.",
    compliant: false,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cr4",
    type: "consent_management",
    label: "Consent Management System",
    description: "Implement consent collection, storage, and withdrawal mechanisms for all data principals.",
    compliant: false,
    updatedAt: new Date().toISOString(),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    company: null,
    compliance: [],
    activities: [],
    loading: true,
  });

  // Auto-login on mount if token exists
  useEffect(() => {
    const restoreSession = async () => {
      const token = getToken();
      if (!token) {
        setState((s) => ({ ...s, loading: false }));
        return;
      }
      try {
        const profileRes = await api.getProfile();
        let companyData = null;
        try {
          const companyRes = await api.getCompanyProfile();
          companyData = companyRes.company;
        } catch {
          // Company profile may not exist yet
        }
        const activityRes = await api.getActivities(20);

        const company = normalizeCompanyProfile(profileRes.user, companyData);
        const activities = (activityRes.activities || []).map(normalizeActivity);

        // Load saved compliance from localStorage or use defaults
        const savedCompliance = localStorage.getItem("dpdp_compliance_" + company.id);
        const compliance = savedCompliance ? JSON.parse(savedCompliance) : DEFAULT_COMPLIANCE;

        setState({
          isAuthenticated: true,
          company,
          compliance,
          activities,
          loading: false,
        });
      } catch {
        setToken(null);
        setState({ isAuthenticated: false, company: null, compliance: [], activities: [], loading: false });
      }
    };
    restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login(email, password);
    setToken(res.token);

    let companyData = null;
    try {
      const companyRes = await api.getCompanyProfile();
      companyData = companyRes.company;
    } catch {
      // Company profile may not exist yet
    }

    const company = normalizeCompanyProfile(res.user, companyData);
    const activities = (res.activities || []).map(normalizeActivity);

    const savedCompliance = localStorage.getItem("dpdp_compliance_" + company.id);
    const compliance = savedCompliance ? JSON.parse(savedCompliance) : DEFAULT_COMPLIANCE;

    setState({
      isAuthenticated: true,
      company,
      compliance,
      activities,
      loading: false,
    });
  }, []);

  const demoLogin = useCallback(() => {
    const demoCompany = {
      id: "demo_company_123",
      name: "Demo Admin",
      email: "admin@democompany.com",
      phone: "+91 99887 76655",
      companyName: "Demo Tech Solutions",
      domain: "democompany.com",
      contactEmail: "contact@democompany.com",
      apiKey: "demo_api_key_xyz_789",
      industry: "Technology",
      registrationNumber: "REG-DEMO-2024",
      createdAt: new Date().toISOString(),
    };

    const demoActivities: ActivityEntry[] = [
      { id: "a1", type: "login", description: "Company admin logged in (Demo)", timestamp: new Date().toISOString() },
    ];

    setToken("demo_company_token");
    setState({
      isAuthenticated: true,
      company: demoCompany,
      compliance: DEFAULT_COMPLIANCE,
      activities: demoActivities,
      loading: false,
    });
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string; industry: string; companyName?: string; domain?: string }) => {
    // Register user with COMPANY role
    const res = await api.register({ name: data.name, email: data.email, password: data.password, role: "COMPANY" });
    setToken(res.token);

    // Register company profile
    let companyData = null;
    try {
      const companyRes = await api.registerCompany({
        companyName: data.companyName || data.name,
        domain: data.domain || "example.com",
        contactEmail: data.email,
      });
      companyData = companyRes.company;
    } catch {
      // Company registration might fail if domain already exists
    }

    const company = normalizeCompanyProfile(res.user, companyData);
    const activities: ActivityEntry[] = [
      { id: `a_${Date.now()}`, type: "login", description: "Company account created", timestamp: new Date().toISOString() },
    ];

    setState({
      isAuthenticated: true,
      company,
      compliance: DEFAULT_COMPLIANCE,
      activities,
      loading: false,
    });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setState({ isAuthenticated: false, company: null, compliance: [], activities: [], loading: false });
  }, []);

  const updateProfile = useCallback(async (data: Partial<CompanyProfile>) => {
    // Update user profile (name/phone)
    if (data.name || data.phone) {
      await api.updateProfile({ name: data.name, phone: data.phone });
    }
    // Update company profile (companyName/contactEmail)
    if (data.companyName || data.contactEmail) {
      try {
        await api.updateCompany({ companyName: data.companyName, contactEmail: data.contactEmail });
      } catch {
        // Company update may fail if no company profile
      }
    }

    setState((s) => ({
      ...s,
      company: s.company ? { ...s.company, ...data } : null,
      activities: [
        { id: `a_${Date.now()}`, type: "data_modification", description: "Updated company profile (Demo)", timestamp: new Date().toISOString() },
        ...s.activities
      ]
    }));
  }, []);

  const updateCompliance = useCallback((complianceId: string, compliant: boolean) => {
    setState((s) => {
      const record = s.compliance.find((c) => c.id === complianceId);
      const updatedCompliance = s.compliance.map((c) =>
        c.id === complianceId ? { ...c, compliant, updatedAt: new Date().toISOString() } : c
      );

      // Persist compliance state to localStorage
      if (s.company) {
        localStorage.setItem("dpdp_compliance_" + s.company.id, JSON.stringify(updatedCompliance));
      }

      return {
        ...s,
        compliance: updatedCompliance,
        activities: [
          {
            id: `a_${Date.now()}`,
            type: "compliance_update" as const,
            description: `${compliant ? "Marked compliant" : "Marked non-compliant"}: ${record?.label}`,
            timestamp: new Date().toISOString(),
          },
          ...s.activities,
        ],
      };
    });
  }, []);

  const refreshActivities = useCallback(async () => {
    try {
      const res = await api.getActivities(50);
      setState((s) => ({ ...s, activities: (res.activities || []).map(normalizeActivity) }));
    } catch {
      // silently fail
    }
  }, []);

  const refreshComplianceReport = useCallback(async () => {
    try {
      const res = await api.getComplianceReport();
      return res;
    } catch {
      return null;
    }
  }, []);

  const requestDataExport = useCallback(() => {
    const exportData = {
      company: state.company,
      compliance: state.compliance,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company-data-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [state.company, state.compliance]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        demoLogin,
        register,
        logout,
        updateProfile: getToken() === "demo_company_token" ? updateProfile : updateProfile, // Demo handled inside updateProfile or via setState
        updateCompliance,
        refreshActivities: getToken() === "demo_company_token" ? async () => { } : refreshActivities,
        refreshComplianceReport: getToken() === "demo_company_token" ? async () => ({ report: {} }) : refreshComplianceReport,
        requestDataExport,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};