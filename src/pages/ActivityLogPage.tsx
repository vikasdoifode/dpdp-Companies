import { useState } from "react";
import { useAuth, ActivityEntry } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ScrollText,
  LogIn,
  Shield,
  Pencil,
  Filter,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";

const TYPE_CONFIG: Record<ActivityEntry["type"], { icon: typeof LogIn; label: string; color: string }> = {
  login: { icon: LogIn, label: "Login", color: "bg-blue-50 text-blue-600" },
  compliance_update: { icon: Shield, label: "Compliance", color: "bg-emerald-50 text-emerald-600" },
  data_modification: { icon: Pencil, label: "Data Change", color: "bg-amber-50 text-amber-600" },
  audit: { icon: ClipboardCheck, label: "Audit", color: "bg-purple-50 text-purple-600" },
  consent_update: { icon: Shield, label: "Consent", color: "bg-teal-50 text-teal-600" },
};

type FilterType = "all" | ActivityEntry["type"];

const ActivityLogPage = () => {
  const { activities } = useAuth();
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "login", label: "Logins" },
    { key: "compliance_update", label: "Compliance" },
    { key: "consent_update", label: "Consents" },
    { key: "data_modification", label: "Data Changes" },
    { key: "audit", label: "Audits" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out pb-20">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Activity Log</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Complete history of logins, compliance changes, data modifications, and audits.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              size="sm"
              className="text-xs h-8"
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {f.key !== "all" && (
                <span className="ml-1.5 opacity-70">
                  ({activities.filter((a) => a.type === f.key).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        <Card className="rounded-[2.5rem] border-none bg-card shadow-xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-black">History</CardTitle>
            </div>
            <CardDescription>{filtered.length} events found</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No activity found for this filter.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />

                <div className="space-y-4">
                  {filtered.map((entry) => {
                    const config = TYPE_CONFIG[entry.type];
                    const Icon = config.icon;
                    return (
                      <div key={entry.id} className="relative flex gap-4 items-start group">
                        <div className={`relative z-10 h-9 w-9 rounded-full ${config.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 pt-1 min-w-0">
                          <p className="text-sm font-bold text-slate-700">{entry.description}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mt-0.5">
                            {new Date(entry.timestamp).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-[9px] uppercase tracking-wider shrink-0 mt-1">
                          {config.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivityLogPage;
