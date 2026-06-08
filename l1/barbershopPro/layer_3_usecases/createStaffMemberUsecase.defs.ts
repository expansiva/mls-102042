export const createStaffMemberUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "createStaffMemberUsecase",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseEntities",
    "stepId": 51,
    "planId": "plan-index-critic:usecasePlan:1"
  },
  "data": {
    "backendArchitecture": {
      "pattern": "layered",
      "layer1Responsibility": "Persist external and module-owned tables, including metrics tables in layer_1_external.",
      "layer2Responsibility": "Expose controllers/BFF endpoints that must call layer_3_usecases and never access tables directly.",
      "layer3Responsibility": "Implement business use cases, enforce rules, and be the only layer that reads/writes layer_1_external tables."
    },
    "controllerRules": {
      "bffMustCallUsecases": true,
      "bffDirectTableAccessForbidden": true
    },
    "usecase": {
      "usecaseId": "createStaffMemberUsecase",
      "title": "Create staff member",
      "purpose": "Create staff profile with role and commission settings.",
      "actor": "manager",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "StaffMember",
        "CommissionRule"
      ],
      "outputEntities": [
        "StaffMember",
        "CommissionRule"
      ],
      "readsTables": [
        "staff_member",
        "commission_rule"
      ],
      "writesTables": [
        "staff_member",
        "commission_rule",
        "performance_metrics"
      ],
      "commands": [
        "createStaffMember"
      ],
      "rulesApplied": [
        "singleLocationScope"
      ]
    }
  }
} as const;

export default createStaffMemberUsecaseUsecasePlan;
