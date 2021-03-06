import React, { FC, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { Formik } from "formik"
import { useDispatch } from "react-redux"

import { colors } from "../assets/colors"

import { userSchema } from "../schemas/user"
import { createUser } from "../services/createUser"
import { addUser } from "../redux/actions"
import { storeData } from "../services/storeData"

import ButtonOne from "../components/ButtonOne"
import InputLogInAndSignUp from "../components/InputLogInAndSignUp"
import ErrorText from "../components/ErrorText"
import GoBack from "../components/Action"
import Loader from "../components/Loader"
import { SignUpScreenNavigationProp } from "../interfaces/props"

const SignUp: FC<SignUpScreenNavigationProp> = ({
  navigation,
}: SignUpScreenNavigationProp) => {
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  const [userExists, setUserExists] = useState(false)

  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
        email: "",
        emailVerification: "",
        phone: "",
      }}
      validationSchema={userSchema}
      onSubmit={(values) =>
        createUser(values)
          .then((response) => {
            setLoader(true)
            dispatch(addUser(response))
            storeData(response)
          })
          .catch((e: string) => {
            if (e === "userAlreadyExists") {
              setUserExists(true)
              setTimeout(() => {
                setUserExists(false)
              }, 4000)
            } else {
              setError("algo salió mal..")
              setTimeout(() => {
                setError("")
              }, 4000)
            }
          })
          .finally(() => setLoader(false))
      }
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <>
          {loader && <Loader />}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <InputLogInAndSignUp
                dataType={values.user}
                placeholder="usuario"
                icon="user"
                setDataType={handleChange("user")}
                onBlur={values.user ? handleBlur("user") : undefined}
              />
              {userExists ? (
                <ErrorText text="el usuario ya existe" />
              ) : (
                touched.user && <ErrorText text={`${errors.user}`} />
              )}
              <InputLogInAndSignUp
                dataType={values.password}
                placeholder="contraseña"
                icon="lock"
                secureTextEntry
                setDataType={handleChange("password")}
                onBlur={values.password ? handleBlur("password") : undefined}
              />
              {touched.password && <ErrorText text={`${errors.password}`} />}
              <InputLogInAndSignUp
                dataType={values.email}
                placeholder="email"
                icon="mail"
                setDataType={handleChange("email")}
                onBlur={values.email ? handleBlur("email") : undefined}
                keyboardType="email-address"
              />
              {touched.email && <ErrorText text={`${errors.email}`} />}
              <InputLogInAndSignUp
                dataType={values.emailVerification}
                placeholder="repetir email"
                icon="sync"
                setDataType={handleChange("emailVerification")}
                onBlur={
                  values.emailVerification
                    ? handleBlur("emailVerification")
                    : undefined
                }
                keyboardType="email-address"
              />
              {touched.emailVerification && (
                <ErrorText text={`${errors.emailVerification}`} />
              )}
              <InputLogInAndSignUp
                dataType={values.phone}
                placeholder="celular (opcional)"
                icon="mobile1"
                setDataType={handleChange("phone")}
                onBlur={values.phone ? handleBlur("phone") : undefined}
                keyboardType="numeric"
              />
              {touched.phone && <ErrorText text={`${errors.phone}`} />}
              {error !== "" && !userExists && <ErrorText text={`${error}`} />}
              <ButtonOne text="crear cuenta" handleTap={handleSubmit} />
              <GoBack
                icon="back"
                text="volver atrás"
                handleTap={() => navigation.goBack()}
              />
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
})

export default SignUp
