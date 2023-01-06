import "./home.css";
import FeatureInfo from "../../components/featuredInfo/FeatureInfo";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userData } from "../../dummyData";

export default function Home() {
  return (
    <div className="home">
      <FeatureInfo />
      <Chart data={userData} title="User Analytic" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
