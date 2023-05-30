import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Timestamp } from 'firebase/firestore';

export type StackNavigatorProps = {
  Stack: any;
};

export type RootStackParamList = {
  SignUp: {};
  SignIn: {};
  News: {};
  About: {};
  NewsCreate: {};
  NewsEdit: { id: string };
  NewsDetail: { id: string };
};

export type RootStackList = keyof RootStackParamList;

export type ScreenProps<T extends RootStackList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type ComponentProps<T extends RootStackList> = StackNavigationProp<
  RootStackParamList,
  T
>;

export type INews = {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  author: string;
  imagePath?: string;
  imageName?: string;
};
