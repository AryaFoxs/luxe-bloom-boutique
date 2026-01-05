import { Settings, Store, Bell, Shield, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const settingsSections = [
  {
    title: "Store Information",
    icon: Store,
    description: "Update your store name, contact details, and address",
  },
  {
    title: "Notifications",
    icon: Bell,
    description: "Configure email and push notification preferences",
  },
  {
    title: "Security",
    icon: Shield,
    description: "Manage passwords and two-factor authentication",
  },
  {
    title: "Appearance",
    icon: Palette,
    description: "Customize your admin dashboard theme",
  },
  {
    title: "Domain & SEO",
    icon: Globe,
    description: "Manage your domain settings and SEO preferences",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-rose/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gray-100 group-hover:bg-rose/10 transition-colors">
                <section.icon className="w-6 h-6 text-gray-600 group-hover:text-rose transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Quick Settings</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Store Name</label>
              <Input
                defaultValue="Luxe Bloom Boutique"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contact Email</label>
              <Input
                defaultValue="hello@luxebloom.com"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input
                defaultValue="+62 822-3659-3493"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Currency</label>
              <Input
                defaultValue="IDR (Rp)"
                className="rounded-xl"
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button className="bg-rose hover:bg-rose-dark text-white rounded-xl">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
