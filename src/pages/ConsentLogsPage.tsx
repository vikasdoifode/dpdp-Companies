import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  Download,
  Eye,
  Clock,
  Hash,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock consent log data (what users have granted to this company)
const MOCK_CONSENT_LOGS = [
  { id: "cl1", userName: "Priya Sharma", userEmail: "priya@example.com", subject: "Marketing", description: "Email promotions", granted: true, timestamp: "2026-03-05T10:30:00Z", blockchainHash: "0x7a2f...b3c1" },
  { id: "cl2", userName: "Rahul Verma", userEmail: "rahul@example.com", subject: "Data Storage", description: "Personal data storage", granted: true, timestamp: "2026-03-04T14:15:00Z", blockchainHash: "0x4d8e...a7f2" },
  { id: "cl3", userName: "Anita Desai", userEmail: "anita@example.com", subject: "Analytics", description: "Usage analytics collection", granted: false, timestamp: "2026-03-03T09:00:00Z", blockchainHash: "0x1b3c...e5d9" },
  { id: "cl4", userName: "Vikram Singh", userEmail: "vikram@example.com", subject: "Marketing", description: "SMS notifications", granted: true, timestamp: "2026-03-02T16:45:00Z", blockchainHash: "0x9f1a...c8b4" },
  { id: "cl5", userName: "Sneha Patel", userEmail: "sneha@example.com", subject: "AI Processing", description: "AI-powered recommendations", granted: false, timestamp: "2026-03-01T11:20:00Z", blockchainHash: "0x6e2d...f1a7" },
  { id: "cl6", userName: "Arjun Mehta", userEmail: "arjun@example.com", subject: "Data Storage", description: "Cloud backup consent", granted: true, timestamp: "2026-02-28T08:30:00Z", blockchainHash: "0x3c5b...d2e8" },
];

type FilterStatus = "all" | "granted" | "revoked";

const ConsentLogsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

  const filtered = MOCK_CONSENT_LOGS.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      log.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "granted" && log.granted) ||
      (statusFilter === "revoked" && !log.granted);
    return matchesSearch && matchesStatus;
  });

  const grantedCount = MOCK_CONSENT_LOGS.filter((l) => l.granted).length;
  const revokedCount = MOCK_CONSENT_LOGS.filter((l) => !l.granted).length;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out pb-20">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center shadow-inner">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Consent Logs</h1>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            View all consent records from <span className="font-bold text-slate-700">Data Principals</span> who have interacted with your platform.
            Each record is anchored on the Polygon blockchain for tamper-proof verification.
          </p>
        </div>

        {/* ─── STATS ─── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Records", value: MOCK_CONSENT_LOGS.length, icon: Users, color: "text-primary bg-primary/10" },
            { label: "Active Consents", value: grantedCount, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
            { label: "Revoked", value: revokedCount, icon: XCircle, color: "text-red-500 bg-red-50" },
          ].map((stat, i) => (
            <Card key={i} className="rounded-[2rem] border-none bg-card shadow-sm hover:shadow-lg transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ─── SEARCH & FILTER ─── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(["all", "granted", "revoked"] as FilterStatus[]).map((f) => (
              <Button
                key={f}
                variant={statusFilter === f ? "default" : "outline"}
                size="sm"
                className="text-xs h-9 capitalize"
                onClick={() => setStatusFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* ─── CONSENT LOG CARDS ─── */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card className="rounded-[2rem] border-none bg-card">
              <CardContent className="p-12 text-center">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No consent records match your search.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((log) => (
              <Card key={log.id} className="group rounded-[2rem] border-none bg-card hover:shadow-xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-stretch">
                    {/* Status Side */}
                    <div className={`md:w-28 flex items-center justify-center p-6 ${log.granted ? "bg-emerald-50" : "bg-red-50"}`}>
                      {log.granted ? (
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-500" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-800">{log.userName}</h3>
                          <Badge variant={log.granted ? "default" : "destructive"} className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${log.granted ? "bg-emerald-100 text-emerald-700 border-none" : ""}`}>
                            {log.granted ? "Active" : "Revoked"}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">{log.userEmail}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {log.subject}: {log.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          <Clock className="h-3 w-3" />
                          {new Date(log.timestamp).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-primary font-mono">
                          <Hash className="h-3 w-3" />
                          {log.blockchainHash}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* ─── EXPORT ─── */}
        <div className="text-center pt-4">
          <Button variant="outline" onClick={() => {
            const blob = new Blob([JSON.stringify(MOCK_CONSENT_LOGS, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "consent-logs-export.json";
            a.click();
            URL.revokeObjectURL(url);
          }}>
            <Download className="h-4 w-4 mr-2" /> Export Consent Logs
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsentLogsPage;
