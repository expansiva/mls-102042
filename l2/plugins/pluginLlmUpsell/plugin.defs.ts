export const pluginLlmUpsellPluginPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginDraft",
  "artifactId": "pluginLlmUpsell",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 36,
    "planId": "plan-index-critic:pluginPlan:1"
  },
  "data": {
    "plugin": {
      "pluginId": "pluginLlmUpsell",
      "provider": "Plugin Llm Upsell",
      "priority": "soon",
      "reason": "Supports the upsell feature once data sources are confirmed.",
      "events": [],
      "requiredCredentials": [],
      "inputData": [],
      "outputData": [],
      "webhooks": [],
      "risks": [],
      "questions": [],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102042_/l2/plugins/pluginLlmUpsell/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102042_/l2/barbershopPro/plugins/pluginLlmUpsell.defs.ts"
    }
  }
} as const;

export default pluginLlmUpsellPluginPlan;
