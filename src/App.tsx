import React, {ReactElement, useState} from 'react';
import {AllAtomsPage} from "./pages/AllAtomsPage";

export type PageProps = {
  setPage: (page: Page) => void;
};

export type Page = (props: PageProps) => ReactElement;

function App() {
  // TODO add react router
  const [Page, setPage] = useState<Page>(() => AllAtomsPage);
  return <Page setPage={page => setPage(() => page)} />;
}

export default App;
