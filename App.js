import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/services/i18n";
import AppNavigator from "./src/navigation/AppNavigator";
import { AppProvider } from "./src/context/AppContext";
import Loader from "./src/components/Loader";
import Toast from "./src/components/Toast";
import { useApp } from "./src/context/AppContext";
import { GlobalRefreshProvider } from "./src/components/GlobalRefreshContext";

const AppContent = () => {
  const { loading, toast, hideToast } = useApp();

  return (
    <NavigationContainer>
      <GlobalRefreshProvider>
        <AppNavigator />
      </GlobalRefreshProvider>
      <Loader loading={loading} />
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={hideToast}
      />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </I18nextProvider>
  );
};

export default App;
