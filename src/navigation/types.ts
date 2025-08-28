import {
  MeterData,
  MeterMode,
} from "../../../Screens/admin/utilities/manage-meters/types";

export type AdminStackParamList = {
  AdminPropertyDetails: {
    propertyId: string;
  };
  InspectionDetails: {
    inspectionId: string;
  };
  MeterDetail: {
    mode: "view" | "edit" | "add";
    meterData?: {
      id: string;
      meterName: string;
      tenent: string;
      status: string;
      manufacturer: string | number;
      meterType: string;
      groupId: string;
      propertyId: string;
      meterId: string;
    };
    onSave?: (data: any) => void;
  };
  // Add other screens and their params here as needed
};
