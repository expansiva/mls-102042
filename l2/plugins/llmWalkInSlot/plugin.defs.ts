export const llmWalkInSlotPluginPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginDraft",
  "artifactId": "llmWalkInSlot",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 36,
    "planId": "plan-index-critic:pluginPlan:1"
  },
  "data": {
    "plugin": {
      "pluginId": "llmWalkInSlot",
      "provider": "Llm Walk In Slot",
      "priority": "soon",
      "reason": "Supports walk-in slot recommendations after core scheduling is live.",
      "events": [],
      "requiredCredentials": [],
      "inputData": [],
      "outputData": [],
      "webhooks": [],
      "risks": [],
      "questions": [],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102042_/l2/plugins/llmWalkInSlot/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102042_/l2/barbershopPro/plugins/llmWalkInSlot.defs.ts"
    }
  }
} as const;

export default llmWalkInSlotPluginPlan;
