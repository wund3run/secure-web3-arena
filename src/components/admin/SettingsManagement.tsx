
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecuritySettingsForm from "./settings/SecuritySettingsForm";
import AuditSettingsForm from "./settings/AuditSettingsForm";
import AppearanceSettingsForm from "./settings/AppearanceSettingsForm";

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your platform settings and preferences.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 lg:max-w-md">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <SecuritySettingsForm />
        </TabsContent>

        {/* Audit Log Settings */}
        <TabsContent value="audit" className="space-y-4">
          <AuditSettingsForm />
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <AppearanceSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
