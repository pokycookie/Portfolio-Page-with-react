import DivePage from "../pages/divePage";
import InitPage from "../pages/initPage";
import { TPage } from "../types";

interface IProps {
  page: TPage;
  setPage: React.Dispatch<React.SetStateAction<TPage>>;
  diveHandler: () => void;
}

export default function PageSelector(props: IProps) {
  switch (props.page) {
    case "surface":
      return (
        <InitPage setPage={props.setPage} diveHandler={props.diveHandler} />
      );
    case "dive":
      return <DivePage setPage={props.setPage} />;
    default:
      return null;
  }
}
