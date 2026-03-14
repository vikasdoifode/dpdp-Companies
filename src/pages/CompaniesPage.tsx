import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Calendar,
  Edit3,
  Save,
  X,
  Download,
  Shield,
  CheckCircle2,
  XCircle,
  History,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const CompaniesPage = () => {
  const { company, compliance, activities, updateProfile, updateCompliance, requestDataExport } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: company?.name ?? "",
    email: company?.email ?? "",
    phone: company?.phone ?? "",
    industry: company?.industry ?? "",
    registrationNumber: company?.registrationNumber ?? "",
  });

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: company?.name ?? "",
      email: company?.email ?? "",
      phone: company?.phone ?? "",
      industry: company?.industry ?? "",
      registrationNumber: company?.registrationNumber ?? "",
    });
    setEditing(false);
  };

  const compliantCount = compliance.filter((c) => c.compliant).length;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out pb-20">

        {/* ─── PAGE HEADER ─── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Company Profile</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your organization's details and compliance status</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={requestDataExport}>
              <Download className="h-4 w-4 mr-2" /> Export Data
            </Button>
            {!editing ? (
              <Button size="sm" onClick={() => setEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        {/* ─── COMPANY INFO CARD ─── */}
        <Card className="rounded-[2.5rem] border-none bg-card shadow-xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black text-slate-800">{company?.name}</CardTitle>
                <CardDescription className="text-sm">{company?.industry} · Data Fiduciary</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            {editing ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Company Name</Label>
                  <Input id="edit-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-industry">Industry</Label>
                  <Input id="edit-industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="edit-reg">Registration Number (CIN)</Label>
                  <Input id="edit-reg" value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} />
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { icon: Mail, label: "Email", value: company?.email },
                  { icon: Phone, label: "Phone", value: company?.phone || "Not set" },
                  { icon: Briefcase, label: "Industry", value: company?.industry },
                  { icon: FileText, label: "CIN", value: company?.registrationNumber || "Not set" },
                  { icon: Calendar, label: "Registered On", value: company?.createdAt ? new Date(company.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "—" },
                  { icon: ShieldCheck, label: "Role", value: "Data Fiduciary" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{item.label}</p>
                      <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ─── COMPLIANCE STATUS ─── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Compliance Status</h2>
              <p className="text-sm text-muted-foreground mt-1">{compliantCount}/{compliance.length} obligations met</p>
            </div>
            <Badge variant={compliantCount === compliance.length ? "default" : "destructive"} className={compliantCount === compliance.length ? "bg-emerald-100 text-emerald-700 border-none" : ""}>
              {compliantCount === compliance.length ? "Fully Compliant" : "Action Required"}
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {compliance.map((record) => (
              <Card key={record.id} className="group rounded-[2rem] border-none bg-card hover:shadow-xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${record.compliant ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                      {record.compliant ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => updateCompliance(record.id, !record.compliant)}
                    >
                      {record.compliant ? "Mark Non-Compliant" : "Mark Compliant"}
                    </Button>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{record.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{record.description}</p>
                  <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-wider font-bold">
                    Updated: {new Date(record.updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── RECENT ACTIVITY ─── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recent Activity</h2>

          <Card className="rounded-[2.5rem] border-none bg-card shadow-xl overflow-hidden">
            <CardContent className="p-6 space-y-1">
              {activities.slice(0, 8).map((activity, i) => (
                <div key={activity.id}>
                  <div className="flex items-center gap-4 py-3 px-2">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                      activity.type === "login" ? "bg-blue-50 text-blue-500"
                        : activity.type === "compliance_update" ? "bg-emerald-50 text-emerald-500"
                        : activity.type === "audit" ? "bg-amber-50 text-amber-500"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {activity.type === "login" ? <Shield className="h-4 w-4" />
                        : activity.type === "compliance_update" ? <CheckCircle2 className="h-4 w-4" />
                        : activity.type === "audit" ? <AlertTriangle className="h-4 w-4" />
                        : <History className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700 truncate">{activity.description}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                        {new Date(activity.timestamp).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-[9px] uppercase tracking-wider shrink-0">
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </div>
                  {i < activities.slice(0, 8).length - 1 && <Separator className="bg-slate-100" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

      </div>
    </DashboardLayout>
  );
};

export default CompaniesPage;
