import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Link2,
  Shield,
  CheckCircle2,
  Hash,
  Clock,
  ExternalLink,
  Lock,
  Layers,
  Database,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_BLOCKCHAIN_RECORDS = [
  { id: "tx1", action: "Consent Granted", user: "priya@example.com", txHash: "0x7a2f8c1d3b5e9f4a6c8d2e7b1a3f5c9d8e2b4a6f8c1d3e5a7b9c2d4e6f8a1b3c", block: 48291537, timestamp: "2026-03-05T10:30:00Z", gas: "0.0021 MATIC" },
  { id: "tx2", action: "Data Stored", user: "rahul@example.com", txHash: "0x4d8e2a1f7c3b9d5e8a2f6c1d3b7e9a4f8c2d6e1a3b5c7d9e2f4a6b8c1d3e5a7b", block: 48291540, timestamp: "2026-03-04T14:15:00Z", gas: "0.0018 MATIC" },
  { id: "tx3", action: "Consent Revoked", user: "anita@example.com", txHash: "0x1b3c5d7e9f2a4b6c8d1e3f5a7b9c2d4e6f8a1b3c5d7e9f2a4b6c8d1e3f5a7b9c", block: 48291543, timestamp: "2026-03-03T09:00:00Z", gas: "0.0024 MATIC" },
  { id: "tx4", action: "Permission Deleted", user: "vikram@example.com", txHash: "0x9f1a3c5b7d2e4f6a8c1b3d5e7f9a2c4b6d8e1f3a5c7b9d2e4f6a8c1b3d5e7f9a", block: 48291550, timestamp: "2026-03-02T16:45:00Z", gas: "0.0019 MATIC" },
  { id: "tx5", action: "Consent Granted", user: "sneha@example.com", txHash: "0x6e2d4f8a1b3c5d7e9f2a4b6c8d1e3f5a7b9c2d4e6f8a1b3c5d7e9f2a4b6c8d1e", block: 48291555, timestamp: "2026-03-01T11:20:00Z", gas: "0.0022 MATIC" },
];

const BlockchainAuditPage = () => {
  const actionColors: Record<string, string> = {
    "Consent Granted": "bg-emerald-50 text-emerald-700",
    "Data Stored": "bg-blue-50 text-blue-700",
    "Consent Revoked": "bg-red-50 text-red-700",
    "Permission Deleted": "bg-amber-50 text-amber-700",
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out pb-20">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center shadow-inner">
            <Layers className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Blockchain Audit Trail</h1>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            Every consent and data operation is anchored on the <span className="font-bold text-slate-700">Polygon blockchain</span>,
            providing tamper-proof, verifiable proof of compliance under the DPDP Act.
          </p>
        </div>

        {/* ─── CHAIN INFO ─── */}
        <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white shadow-xl overflow-hidden relative">
          <Shield className="absolute -bottom-10 -right-10 h-40 w-40 text-white/5 rotate-12" />
          <CardContent className="p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: Link2, label: "Network", value: "Polygon (Amoy Testnet)" },
                { icon: Database, label: "Total Anchored", value: `${MOCK_BLOCKCHAIN_RECORDS.length} records` },
                { icon: Fingerprint, label: "Verification", value: "SHA-256 Hash" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{item.label}</p>
                    <p className="text-sm font-bold text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ─── TRANSACTION LIST ─── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recent Transactions</h2>

          {MOCK_BLOCKCHAIN_RECORDS.map((record) => (
            <Card key={record.id} className="group rounded-[2rem] border-none bg-card hover:shadow-xl transition-all duration-500 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Action & User */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className={`${actionColors[record.action] || "bg-slate-100 text-slate-700"} border-none text-[10px] font-black uppercase tracking-widest px-3 py-1`}>
                        {record.action}
                      </Badge>
                      <span className="text-sm text-slate-500">{record.user}</span>
                    </div>

                    {/* Tx Hash */}
                    <div className="flex items-center gap-2">
                      <Hash className="h-3.5 w-3.5 text-primary shrink-0" />
                      <code className="text-xs font-mono text-slate-400 truncate max-w-[400px]">
                        {record.txHash}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 shrink-0"
                        onClick={() => window.open(`https://amoy.polygonscan.com/tx/${record.txHash}`, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3 text-primary" />
                      </Button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <Clock className="h-3 w-3" />
                      {new Date(record.timestamp).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Block #{record.block.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-500 font-bold">
                      Gas: {record.gas}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <Card className="rounded-[2.5rem] border-none bg-card shadow-xl overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-black text-slate-800">🔗 How Blockchain Anchoring Works</CardTitle>
            <CardDescription>Understanding the tamper-proof verification process</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "Data Hash", desc: "A SHA-256 hash of the consent/data record is generated" },
                { step: "2", title: "Tx Submit", desc: "Hash is submitted as a transaction on Polygon" },
                { step: "3", title: "Block Confirm", desc: "Transaction is confirmed and included in a block" },
                { step: "4", title: "Verify", desc: "Anyone can verify the hash on-chain for proof" },
              ].map((item) => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-blue-50/40 border border-blue-100/50 group hover:bg-card hover:shadow-lg transition-all">
                  <div className="absolute top-4 right-4 text-3xl font-black text-slate-200 group-hover:text-primary/10 transition-colors">
                    {item.step}
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ─── FOOTER ─── */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-100 rounded-full border border-slate-200">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-slate-600 tracking-tight">Immutable audit trail powered by Polygon blockchain</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlockchainAuditPage;
