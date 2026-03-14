import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Shield, FileText } from "lucide-react";

const CompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out pb-20">
        <div className="flex items-center gap-4">
          <Link to="/companies">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Company Details</h1>
            <p className="text-sm text-muted-foreground">Viewing company ID: {id}</p>
          </div>
        </div>

        <Card className="rounded-[2.5rem] border-none bg-card shadow-xl overflow-hidden">
          <CardHeader className="p-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-xl font-black text-slate-800">Company Information</CardTitle>
                <CardDescription>Detailed view for the selected company</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Building2, label: "Company Name", value: "TechCorp Solutions Pvt. Ltd." },
                { icon: FileText, label: "Registration (CIN)", value: "CIN U72200DL2020PTC123456" },
                { icon: Shield, label: "Compliance Status", value: "Active" },
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

            <div className="flex items-center gap-2 pt-4">
              <Badge className="bg-emerald-100 text-emerald-700 border-none">Data Fiduciary</Badge>
              <Badge variant="secondary">DPDP Registered</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDetailsPage;