import React, { FC, useState, useEffect } from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { StackNavigationProp } from "@react-navigation/stack"

import { colors } from "../assets/colors"
import { UserState } from "../redux/userReducer"
import { getFields } from "../services/getFields"
import { height } from "../assets/dimensions"

import Search from "../components/Search"
import Carousel from "../components/Carousel"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import Banner from "../components/Banner"
import RentPlayRepeat from "../components/RentPlayRepeat"

export type RootStackParamList = {
  Home: undefined
  FieldDetails: Field
  FieldList: undefined
  NotFound: undefined
}

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>

type Props = {
  navigation: HomeScreenNavigationProp
}

export interface Field {
  name: string
  location: string
  price: string
  image: string
  id: number
  numberOfRatings: number
  sumOfRatings: number
  phone: string
}

const PADDING_VERTICAL = 10

const Home: FC<Props> = ({ navigation }: Props) => {
  const [fields, setFields] = useState<Field[]>([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    getFields()
      .then((fields) => setFields(fields))
      .catch(() => navigation.navigate("NotFound"))
      .finally(() => setLoader(false))
  }, [])

  const user = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )

  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <Text style={styles.user}>{user} ⚽</Text>
      <Text style={styles.greeting}>hey 👋! se juega?</Text>
      <Search />
      <Text style={styles.betterFields}>nuestras mejores canchas 💯.</Text>
      <Carousel data={fields} navigation={navigation} />
      <RentPlayRepeat />
      <Banner
        text="ver todas las canchas 🚀"
        handleTap={() => navigation.navigate("FieldList")}
      />
      <Footer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
  },
  user: {
    color: colors.secondary,
    fontFamily: "poppins-bold-italic",
    marginTop: height * 0.05,
  },
  greeting: {
    color: colors.secondary,
    paddingVertical: PADDING_VERTICAL,
    fontSize: 30,
    fontFamily: "poppins-extrabold",
  },
  betterFields: {
    color: colors.secondary,
    paddingVertical: PADDING_VERTICAL,
    fontSize: 20,
    fontFamily: "poppins-bold-italic",
  },
})

export default Home
