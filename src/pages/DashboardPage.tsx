import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Eye,
  Database,
  RefreshCcw,
  Users,
  Building2,
  FileText,
  Gavel,
  History,
  Briefcase,
  Scale,
  ClipboardCheck,
  Bell,
  ShieldCheck,
} from "lucide-react";

const DashboardPage = () => {
  const { company, compliance } = useAuth();

  const compliantCount = compliance.filter((c) => c.compliant).length;
  const totalCount = compliance.length;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out pb-20">

        {/* ─── HERO SECTION ─── */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-12 text-white shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Shield className="h-64 w-64 rotate-12" />
          </div>
          <div className="absolute -bottom-10 -left-10 opacity-5 pointer-events-none">
            <Lock className="h-48 w-48 -rotate-12" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Data Fiduciary Dashboard
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              DPDP Act 2023 <span className="text-primary">Compliance</span> Hub
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Manage your organization's obligations under India's Digital Personal Data Protection Act.
              Ensure compliance as a Data Fiduciary with DataKavatch.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-bold">{compliantCount}/{totalCount} Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <Building2 className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-bold">{company?.industry}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-bold">Data Fiduciary</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── OBLIGATIONS SECTION ─── */}
        <section className="space-y-6">
          <div className="flex flex-col items-center text-center space-y-2 mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">📋 Data Fiduciary Obligations</h2>
            <div className="h-1.5 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {compliance.map((record, i) => (
              <Card key={record.id} className="group hover:shadow-2xl transition-all duration-500 border-none bg-card rounded-[2rem] overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500 ${record.compliant ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {record.compliant ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                    </div>
                    <Badge variant={record.compliant ? "default" : "destructive"} className={`text-[10px] uppercase tracking-wider ${record.compliant ? 'bg-emerald-100 text-emerald-700 border-none' : ''}`}>
                      {record.compliant ? "Compliant" : "Action Needed"}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{record.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{record.description}</p>
                  <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-wider font-bold">Last updated: {new Date(record.updatedAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── KEY ROLES SECTION ─── */}
        <section className="space-y-6">
          <div className="flex flex-col items-center text-center space-y-2 mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">🏢 Key Roles Defined</h2>
            <div className="h-1.5 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, title: "Data Principal", desc: "The individual whose personal data is being collected by your organization.", example: "Example: Your customers", color: "bg-blue-50 text-blue-600" },
              { icon: Building2, title: "Data Fiduciary", desc: "Your organization — determines how and why data is processed.", example: "Example: Your company", color: "bg-primary/5 text-primary" },
              { icon: Briefcase, title: "Data Processor", desc: "Processes data on behalf of your organization.", example: "Example: Cloud hosting provider", color: "bg-blue-50 text-blue-600" },
            ].map((role, i) => (
              <Card key={i} className="group hover:shadow-2xl transition-all duration-500 border-none bg-card rounded-[2rem] overflow-hidden">
                <CardContent className="p-8">
                  <div className={`h-14 w-14 rounded-2xl ${role.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <role.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{role.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{role.desc}</p>
                  <Badge variant="secondary" className="bg-blue-100/50 text-blue-700 border-none font-bold text-[10px] uppercase tracking-wider">
                    {role.example}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── CORE PRINCIPLES ─── */}
        <section className="space-y-8">
          <div className="flex flex-col items-center text-center space-y-2 mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">🔐 Core Compliance Principles</h2>
            <p className="text-slate-500 max-w-xl">Foundational rules your organization must follow under DPDP Law.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "1", title: "Consent-Based", desc: "Collect data only with clear, informed consent. Must be unambiguous and revocable.", icon: CheckCircle2 },
              { id: "2", title: "Purpose Limitation", desc: "Data must be used only for the purpose stated at collection.", icon: Eye },
              { id: "3", title: "Data Minimization", desc: "Collect only necessary data. No excess storage of sensitive info.", icon: Database },
              { id: "4", title: "Storage Limitation", desc: "Data must not be stored longer than required for the specific purpose.", icon: History },
              { id: "5", title: "Accuracy", desc: "Data must be accurate and up-to-date at all points of processing.", icon: RefreshCcw },
              { id: "6", title: "Security Safeguards", desc: "Implementation of reasonable security measures to prevent data breaches.", icon: Lock },
            ].map((p, i) => (
              <div key={i} className="relative group p-8 rounded-[2rem] bg-blue-50/40 border border-blue-100/50 hover:bg-card hover:shadow-xl transition-all duration-500">
                <div className="absolute top-4 right-6 text-4xl font-black text-slate-200 group-hover:text-primary/10 transition-colors">
                  {p.id}
                </div>
                <p.icon className="h-10 w-10 text-primary mb-6" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">{p.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── REGULATORY & PENALTIES ─── */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Fiduciary Duties */}
          <Card className="col-span-full lg:col-span-2 rounded-[2.5rem] border-none bg-card shadow-xl overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-primary">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">⚖️ Data Fiduciary Duties</CardTitle>
                  <CardDescription>Your legal obligations under the DPDP Act</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Provide clear privacy notices",
                "Implement consent mechanisms",
                "Honor data principal rights",
                "Report breaches within 72 hours",
                "Appoint Data Protection Officer",
                "Conduct Data Protection Impact Assessment"
              ].map((duty, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 group hover:border-primary/20 transition-all">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-700">{duty}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Penalties */}
          <Card className="rounded-[2.5rem] border-none bg-slate-900 shadow-xl overflow-hidden text-white relative">
            <Gavel className="absolute -bottom-10 -right-10 h-40 w-40 text-white/5 opacity-10 rotate-12" />
            <CardHeader className="p-8">
              <div className="h-12 w-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-black tracking-tight">🏛 Regulatory Authority</CardTitle>
              <CardDescription className="text-slate-400">Data Protection Board of India</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4">
              <div className="space-y-2">
                {["Complaints Management", "Investigations", "Penalty Enforcement"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {item}
                  </div>
                ))}
              </div>
              <Separator className="bg-white/10" />
              <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-black uppercase tracking-wider">Major Penalties</span>
                </div>
                <p className="text-xl font-black text-white">₹250 Crore</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Maximum per violation</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── SECURITY FOOTER ─── */}
        <div className="text-center space-y-4 pt-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-100 rounded-full border border-slate-200 hover:scale-105 transition-transform cursor-help group">
            <Lock className="h-4 w-4 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold text-slate-600 tracking-tight">Secure & Audited Interface by DataKavatch Sentinel</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed italic">
            "Ensure compliance. Protect your customers' data. DataKavatch helps Data Fiduciaries meet all DPDP Act obligations."
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;