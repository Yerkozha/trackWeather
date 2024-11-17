import { connector } from "@/presentation/container/MainContainer";
import { RootStackParamList, ScreenProps } from "@/presentation/container/types";
import { MainViewModel } from "@/presentation/view-model/main/MainViewModel"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnectedProps } from "react-redux";

type CitiesRouteParams = NativeStackScreenProps<RootStackParamList, 'Cities'>;

export interface CitiesIncomeProps {
    vm: MainViewModel,
}

export type ContainerConnector = ConnectedProps<typeof connector>

export type CitiesProps = CitiesIncomeProps & CitiesRouteParams & ScreenProps & ContainerConnector