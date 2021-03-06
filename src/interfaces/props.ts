import { Animated } from "react-native"
import {
  Field,
  RootStackParamList,
  SignUpScreenNavigation,
  LogInScreenNavigation,
  FieldListScreenNavigation,
  NotFoundScreenNavigation,
  HomeScreenNavigation,
} from "./interfaces"
import { RouteProp } from "@react-navigation/native"

export interface ActionProps {
  text: string
  icon: "back" | "adduser"
  handleTap: () => void
}

export interface BannerProps {
  text: string
  handleTap: () => void
}

export interface BookingsProps {
  index: number
  numberOfField: string
  startsAt: number
  result: unknown[]
  navigate: (index: number) => void
}

export interface ButtonOneProps {
  text: string
  handleTap: () => void
  textColor?: string
}

export interface SwipeButtonProps {
  handleSwipe: () => void
}

export interface CheckoutProps {
  navigation: HomeScreenNavigation
  route: RouteProp<RootStackParamList, "Checkout">
}

export interface CarouselProps {
  data: Field[]
  navigation: HomeScreenNavigation
}

export interface FieldCardProps {
  field: Field
  handleNavigation: () => void
}

export interface OverflowItemsProps {
  data: Field[]
  scrollXAnimated: Animated.Value
}

export interface ErrorTextProps {
  text: string
}

export interface InputLogInAndSignUpProps {
  dataType: string
  placeholder: string
  secureTextEntry?: boolean
  icon: "user" | "mail" | "lock" | "sync" | "mobile1"
  setDataType: (dataType: string) => void
  onBlur?: ((e: unknown) => void) | undefined
  keyboardType?: "numeric" | "email-address"
}

export interface FieldDetailsProps {
  navigation: HomeScreenNavigation
  route: RouteProp<RootStackParamList, "FieldDetails">
}

export interface SignUpScreenNavigationProp {
  navigation: SignUpScreenNavigation
}

export interface LogInScreenNavigationProp {
  navigation: LogInScreenNavigation
}

export interface FieldListScreenNavigationProp {
  navigation: FieldListScreenNavigation
}

export interface NotFoundScreenNavigationProp {
  navigation: NotFoundScreenNavigation
}

export interface HomeScreenNavigationProp {
  navigation: HomeScreenNavigation
}
