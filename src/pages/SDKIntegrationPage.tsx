import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Copy,
  Check,
  Shield,
  Terminal,
  Package,
  Key,
  Globe,
  Zap,
  Lock,
  BookOpen,
} from "lucide-react";

const SDKIntegrationPage = () => {
  const { company } = useAuth();
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const apiKey = company?.apiKey || "dpdp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  const baseUrl = "http://localhost:5000/api";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      id: "install",
      icon: Package,
      title: "Install the SDK",
      description: "Add the FindPermissionData SDK to your project.",
      code: "npm install @shreaysh/dpdp",
    },
    {
      id: "init",
      icon: Key,
      title: "Initialize the Client",
      description: "Use your API key to authenticate.",
      code: `import { DPDPClient } from '@shreaysh/dpdp';

const client = new DPDPClient('${apiKey}', '${baseUrl}');`,
    },
    {
      id: "user",
      icon: Globe,
      title: "Create a User",
      description: "Register a data principal in your system.",
      code: `const user = await client.createUser({
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210'
});`,
    },
    {
      id: "permission",
      icon: Shield,
      title: "Store Permission",
      description: "Record user consent with blockchain proof.",
      code: `await client.storePermission({
  userId: user.id,
  subject: 'Marketing',
  description: 'Email promotions and newsletters',
  granted: true
});`,
    },
    {
      id: "data",
      icon: Lock,
      title: "Store Data Record",
      description: "Store personal data with hashing & audit trail.",
      code: `await client.storeData({
  userId: user.id,
  dataType: 'email',
  value: 'priya@example.com',
  purpose: 'account_verification'
});`,
    },
    {
      id: "revoke",
      icon: Zap,
      title: "Revoke Permission",
      description: "Allow users to withdraw consent at any time.",
      code: `await client.revokePermission({
  userId: user.id,
  subject: 'Marketing'
});`,
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out pb-20">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center shadow-inner">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">SDK Integration</h1>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            Integrate the <span className="font-bold text-slate-700">@shreaysh/dpdp</span> SDK into your application
            to manage user consent and data records with blockchain-backed proof.
          </p>
        </div>

        {/* ─── API KEY CARD ─── */}
        <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white shadow-xl overflow-hidden relative">
          <Shield className="absolute -bottom-10 -right-10 h-40 w-40 text-white/5 rotate-12" />
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-black text-white">Your API Key</h3>
                <p className="text-xs text-slate-400">Company: {company?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
              <code className="flex-1 text-sm font-mono text-emerald-400 truncate">
                {apiKey}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white shrink-0"
                onClick={() => copyToClipboard(apiKey, "apikey")}
              >
                {copiedStep === "apikey" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-wider font-bold">
              ⚠️ Keep this key secret. Never expose it in frontend code.
            </p>
          </CardContent>
        </Card>

        {/* ─── INTEGRATION STEPS ─── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Quick Start Guide</h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <Card key={step.id} className="group rounded-[2rem] border-none bg-card hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Step Number & Icon */}
                    <div className="md:w-24 flex items-center justify-center p-6 bg-blue-50/50">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl font-black text-primary/20">{i + 1}</span>
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                        <p className="text-sm text-slate-500">{step.description}</p>
                      </div>

                      {/* Code Block */}
                      <div className="relative bg-slate-900 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                          <div className="flex items-center gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] text-slate-500 hover:text-white"
                            onClick={() => copyToClipboard(step.code, step.id)}
                          >
                            {copiedStep === step.id ? (
                              <span className="flex items-center gap-1 text-emerald-400"><Check className="h-3 w-3" /> Copied</span>
                            ) : (
                              <span className="flex items-center gap-1"><Copy className="h-3 w-3" /> Copy</span>
                            )}
                          </Button>
                        </div>
                        <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── SDK METHODS ─── */}
        <Card className="rounded-[2.5rem] border-none bg-card shadow-xl overflow-hidden">
          <CardHeader className="p-8">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-black text-slate-800">Available SDK Methods</CardTitle>
            </div>
            <CardDescription>Complete reference of methods provided by @shreaysh/dpdp</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { method: "createUser()", desc: "Register a data principal" },
                { method: "storePermission()", desc: "Record consent with blockchain proof" },
                { method: "storeData()", desc: "Store personal data records" },
                { method: "revokePermission()", desc: "Withdraw user consent" },
                { method: "deletePermission()", desc: "Permanently remove permission" },
                { method: "viewPermission()", desc: "View current permission status" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 group hover:border-primary/20 transition-all">
                  <code className="text-sm font-mono font-bold text-primary">{item.method}</code>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ─── FOOTER ─── */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-100 rounded-full border border-slate-200">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-slate-600 tracking-tight">All SDK requests are encrypted & blockchain-verified</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SDKIntegrationPage;
