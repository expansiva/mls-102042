export const calculateCommissionUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "calculateCommissionUsecase",
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
      "usecaseId": "calculateCommissionUsecase",
      "title": "Calculate commissions",
      "purpose": "Recalculate commissions for a date range and update performance metrics.",
      "actor": "owner",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Sale",
        "CommissionRule",
        "StaffMember"
      ],
      "outputEntities": [
        "Sale",
        "CommissionRule"
      ],
      "readsTables": [
        "sale",
        "commission_rule",
        "staff_member"
      ],
      "writesTables": [
        "sale",
        "performance_metrics"
      ],
      "commands": [
        "runCommissionCalculation"
      ],
      "rulesApplied": [
        "commissionCalculationRequired",
        "singleLocationScope"
      ]
    }
  }
} as const;

export default calculateCommissionUsecaseUsecasePlan;
