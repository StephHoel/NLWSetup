import { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SQLite from 'expo-sqlite'

import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { api } from '../lib/axios';
import { habitsTable, habitWeekDaysTable, habitWeekDaysIndex, daysTable, daysIndex, dayHabitsTable, dayHabitsIndex, refefineTables } from '../db/create-tables';

const availableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export function New() {
   const [weekDays, setWeekDays] = useState<number[]>([])
   const [title, setTitle] = useState('')

   const { navigate } = useNavigation()

   function handleToggleWeekDay(weekDayIndex: number) {
      if (weekDays.includes(weekDayIndex)) {
         setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
      } else {
         setWeekDays(prevState => [...prevState, weekDayIndex])
      }
   }

   async function handleCreateNewHabit() {
      try {
         if (!title.trim() || weekDays.length == 0) {
            return Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a recorrência!')
         }

         await api.post('/habits', { title, weekDays })

         Alert.alert('Novo Hábito', 'Hábito criado com sucesso!')

         setTitle('')
         setWeekDays([])

         navigate('home')
      } catch (error) {
         console.log(error)
         Alert.alert('Ops', 'Não foi possível criar o novo hábito!')
      }
   }

   const [habits, setHabits] = useState<any[]>([])

   function handleNew() {
      const id = uuid.v4()

      const newData = {
         id,
         title,
         weekDays,
      }

      //AsyncStorage.setItem('newData', newData)

      console.log(newData)
   }

   const db = SQLite.openDatabase('database.db')

   useEffect(() => {
      db.transaction(tx => {
         tx.executeSql(habitsTable)
         tx.executeSql(habitWeekDaysTable)
         tx.executeSql(habitWeekDaysIndex)
         tx.executeSql(daysTable)
         tx.executeSql(daysIndex)
         tx.executeSql(dayHabitsTable)
         tx.executeSql(dayHabitsIndex)
         tx.executeSql(refefineTables)

         tx.executeSql('SELECT * FROM habits', [],
            (txObj, resultSet) => {
               setHabits(resultSet.rows._array);
               console.log(resultSet)
            }
         )
      })
   }, [])


   // useEffect(() => {
   //    db.transaction(function (txn) {
   //       txn.executeSql(
   //          "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
   //          [],
   //          function (tx, res) {
   //             console.log('item:', res.rows.length);
   //             if (res.rows.length == 0) {
   //                txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
   //                txn.executeSql(
   //                   'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_phone INT(15), student_address VARCHAR(255))',
   //                   []
   //                );
   //             }
   //          }
   //       );
   //    })

   // }, []);



   const addHabit = () => {
      db.transaction(tx => {
         tx.executeSql('INSERT INTO habits (title) values (?)', [title],
            (txObj, resultSet) => {
               let existingTitles = [...habits]
               existingTitles.push({ id: uuid.v4(), name: title })
               setHabits(existingTitles)
               setTitle('')
            }
         )
      })
   }

   const showHabits = () => {
      return habits.map((habit, index) => {
         return (
            <View key={index}>
               <Text>{habit.title}</Text>
            </View>
         )
      })
   }

   // if (habits.length > 0) {
   //    return (
   //       <View className="flex-1 bg-background px-8 pt-16">
   //          <ScrollView
   //             showsVerticalScrollIndicator={false}
   //             contentContainerStyle={{ paddingBottom: 100 }}
   //          >
   //             <BackButton />

   //             <Text className="mt-6 text-white font-extrabold text-3xl">
   //                Criar hábito
   //             </Text>

   //             <Text className="mt-6 text-white font-semibold text-base">
   //                Qual seu comprometimento?
   //             </Text>

   //             <TextInput
   //                className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-violet-600"
   //                placeholder="Exercícios, dormir bem, etc"
   //                placeholderTextColor={colors.zinc[400]}
   //                onChangeText={setTitle}
   //                value={title}
   //             />

   //             <Text className="font-semibold mt-4 mb-3 text-white text-base">
   //                Qual a recorrência?
   //             </Text>

   //             {
   //                availableWeekDays.map((weekDay, index) => (
   //                   <Checkbox
   //                      key={weekDay}
   //                      title={weekDay}
   //                      checked={weekDays.includes(index)}
   //                      onPress={() => { handleToggleWeekDay(index) }}
   //                   />
   //                ))
   //             }

   //             <TouchableOpacity
   //                className="w-full h-14 flex-row items-center justify-center bg-violet-600 rounded-md mt-6"
   //                activeOpacity={0.7}
   //                onPress={handleNew}
   //             >
   //                <Feather
   //                   name="check"
   //                   size={20}
   //                   color={colors.white}
   //                />

   //                <Text className="font-semibold text-base text-white ml-2">
   //                   Confirmar
   //                </Text>
   //             </TouchableOpacity>
   //          </ScrollView>

   //       </View>
   //    )
   // } else {

   return (
      <View className="flex-1 bg-background px-8 pt-16">
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
         >
            <BackButton />

            <Text className="mt-6 text-white font-extrabold text-3xl">
               Quantidade de hábitos: {habits.length}
            </Text>

            <TextInput
               className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-violet-600"
               placeholder="Exercícios, dormir bem, etc"
               placeholderTextColor={colors.zinc[400]}
               onChangeText={setTitle}
               value={title}
            />

            <TouchableOpacity
               className="w-full h-14 flex-row items-center justify-center bg-violet-600 rounded-md mt-6"
               activeOpacity={0.7}
               onPress={addHabit}
            >
               <Feather
                  name="check"
                  size={20}
                  color={colors.white}
               />

               <Text className="font-semibold text-base text-white ml-2">
                  Confirmar
               </Text>
            </TouchableOpacity>

            <Text className="mt-6 text-white font-extrabold text-3xl">
               {showHabits()}
            </Text>

         </ScrollView>
      </View>
   )

}