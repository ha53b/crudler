import { useState, useEffect } from "react";
import { LogBox, StyleSheet, Text } from "react-native";
import Screen from "../layout/Screen";
import ModuleList from "../entity/modules/ModuleList.js";
import API from "../API/API.js";
import RenderCount from "../UI/RenderCount.js";
import Icons from "../UI/Icons.js";
import { Button, ButtonTray } from "../UI/Button.js";

const ModuleListScreen = ({ navigation }) => {
  // Initializations--------
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const modulesEndpoint = "https://softwarehub.uk/unibase/api/modules";

  // State---------
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadModules = async (endpoint) => {
    const response = await API.get(endpoint);
    setIsLoading(false);
    if (response.isSuccess) setModules(response.result);
  };

  useEffect(() => {
    loadModules(modulesEndpoint);
  }, []);

  // Handlers-----------
  const handleAdd = (newModule) => setModules([...modules, newModule]);

  const handleDelete = (deletedModule) =>
    setModules(
      modules.filter((module) => module.ModuleID !== deletedModule.ModuleID)
    );

  const handleModify = (updatedModule) =>
    setModules(
      modules.map((module) =>
        module.ModuleID === updatedModule.ModuleID ? updatedModule : module
      )
    );

  const onDelete = (module) => {
    handleDelete(module);
    navigation.goBack();
  };

  const onAdd = (module) => {
    handleAdd(module);
    navigation.goBack();
  };

  const onModify = (module) => {
    handleModify(module);
    navigation.navigate("ModuleListScreen");
  };

  const gotoViewScreen = (module) =>
    navigation.navigate("ModuleViewScreen", { module, onDelete, onModify });
  const gotoAddScreen = () => navigation.navigate("ModuleAddScreen", { onAdd });

  // View----------
  return (
    <Screen>
      <RenderCount />
      <ButtonTray>
        <Button label="Add" icon={<Icons.Add />} onClick={gotoAddScreen} />
      </ButtonTray>
      {isLoading && <Text>Loading records ...</Text>}
      <ModuleList modules={modules} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ModuleListScreen;
