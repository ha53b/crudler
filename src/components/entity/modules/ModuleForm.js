import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icons from "../../UI/Icons.js";
import Form from "../../UI/Form.js";

const defaultModule = {
  ModuleID: null,
  ModuleCode: null,
  ModuleName: null,
  ModuleLevel: null,
  ModuleLeaderID: null,
  ModuleLeaderName: null,
  ModuleImage: null,
};

const ModuleForm = ({ originalModule, onSumbit, onCancel }) => {
  // Initialisations ---------------------
  (defaultModule.ModuleID = Math.floor(100000 + Math.random() * 900000)),
    (defaultModule.ModuleImage =
      "https://images.freeimages.com/images/small-previews/cf5/cellphone-1313194.jpg");

  const levels = [
    { value: 3, label: "3 (Foundation)" },
    { value: 4, label: "4 (First year)" },
    { value: 5, label: "5 (Second year)" },
    { value: 6, label: "6 (Final year)" },
    { value: 7, label: "7 (Masters)" },
  ];

  // State -------------------------------
  const [module, setModule] = useState(originalModule || defaultModule);

  // Handlers ----------------------------
  const handelChange = (field, value) =>
    setModule({ ...module, [field]: value });
  const handleSubmit = () => onSumbit(module);
    //code
  // View --------------------------------
  const submitLabel = originalModule ? "Modify" : "Add";
  const submitIcon = originalModule ? <Icons.Edit /> : <Icons.Add />;

  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      submitIcon={submitIcon}
    >
      <Form.InputText
        label="Module code"
        value={module.ModuleCode}
        onChange={(value) => handelChange("ModuleCode", value)}
      />

      <Form.InputText
        label="Module name"
        value={module.ModuleName}
        onChange={(value) => handelChange("ModuleName", value)}
      />

      <Form.InputSelect
        prompt="Select module level ..."
        options={levels}
        label="Module level"
        value={module.ModuleLevel}
        onChange={(value) => handelChange("ModuleLevel", value)}
      />
    
      <Form.InputText
        label="Module leader"
        value={module.ModuleLeaderName}
        onChange={(value) => handelChange("ModuleLeaderName", value)}
      />

      <Form.InputText
        label="Module image URL"
        value={module.ModuleImage}
        onChange={(value) => handelChange("ModuleImage", value)}
      />
    </Form>
  );
};

const styles = StyleSheet.create({});

export default ModuleForm;