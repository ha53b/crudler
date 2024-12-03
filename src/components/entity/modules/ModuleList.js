import { ScrollView, StyleSheet } from "react-native";
import ModuleItem from " 6./ModuleItem.js";

const ModuleList = ({ modules, onSelect }) => {
  // Initialisations
  console.log("modulelist", modules);
  // State
  // Handlers
  // View

  return (
    <ScrollView style={styles.container}>
      {modules.map((module) => {
        return (
          <ModuleItem
            key={module.ModuleCode}
            module={module}
            onSelect={onSelect}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
//done
export default ModuleList;