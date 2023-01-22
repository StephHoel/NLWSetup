import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';

import * as SQLite from 'expo-sqlite';
import * as tables from '../db/create-tables';
import uuid from 'react-native-uuid';
import { createHabit } from '../db/habit';

export function NewScreen() {
   const [title, setTitle] = useState('');

   const [S_Phone, setPhone] = useState('');
   const [S_Address, setAddress] = useState('');

   const [habits, setHabits] = useState<any[]>([])

   const db = SQLite.openDatabase('database.db')

   useEffect(() => {
      db.transaction(tx => {
         tx.executeSql(tables.habitsTable)
         console.log('table habits criada')
         tx.executeSql(tables.habitWeekDaysTable)
         tx.executeSql(tables.habitWeekDaysIndex)
         tx.executeSql(tables.daysTable)
         tx.executeSql(tables.daysIndex)
         tx.executeSql(tables.dayHabitsTable)
         tx.executeSql(tables.dayHabitsIndex)
         tx.executeSql(tables.refefineTables)

         tx.executeSql('SELECT * FROM habits', [],
            (txObj, resultSet) => {
               // setHabits(resultSet.rows._array);
               
               var temp = [];
               for (let i = 0; i < resultSet.rows.length; ++i)
                  temp.push(resultSet.rows.item(i));
               
               console.log(temp)
               console.log('linhas da table habits')
               console.log(resultSet)
               console.log(txObj)
            }
         )
      })
      console.log(`habits: ${habits}`)
   }, [])


   const insertData = async () => {
      title.trim()
         ? createHabit(title)
         : console.log('Título vazio')
      
      // try {
      //    db.transaction(tx => {
      //       console.log('aqui?')
      //       tx.executeSql(
      //          'INSERT INTO habits (id, title, created_at) VALUES (?,?,?)',
      //          [uuid.v4().toString(), title.trim(), new Date().toISOString()],
      //          (tx, results) => {
      //             console.log('Results: ', results.rowsAffected);
      //             if (results.rowsAffected > 0) {
      //                Alert.alert('Hábito criado com sucesso');
      //             } else Alert.alert('Falha ao criar um hábito');
      //          }
      //       );
      //    });
      // } catch (error) {
      //    console.log('error')
      //    console.log(error)
      // }

      // viewStudent();

   }

   const viewStudent = async () => {

      db.transaction((tx) => {
         tx.executeSql(
            'SELECT * FROM habits',
            [],
            (tx, results) => {
               var temp = [];
               for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
               console.log(temp);
            }
         );
      });

   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.mainContainer}>

            <Text style={{ fontSize: 24, textAlign: 'center', color: '#000' }}>
               Insert Data Into SQLite Database
            </Text>

            <TextInput
               style={styles.textInputStyle}
               onChangeText={setTitle}
               placeholder="Enter Title"
               value={title} />

            {/* <TextInput
               style={styles.textInputStyle}
               onChangeText={
                  (text) => setPhone(text)
               }
               placeholder="Enter Student Phone Number"
               keyboardType={'numeric'}
               value={S_Phone} />

            <TextInput
               style={[styles.textInputStyle, { marginBottom: 20 }]}
               onChangeText={
                  (text) => setAddress(text)
               }
               placeholder="Enter Student Address"
               value={S_Address} /> */}

            <TouchableOpacity
               style={styles.touchableOpacity}
               onPress={insertData}>

               <Text style={styles.touchableOpacityText}> Click Here To Insert Data Into SQLite Database </Text>

            </TouchableOpacity>

         </View>

      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
   },

   touchableOpacity: {
      backgroundColor: '#0091EA',
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
      width: '100%'
   },

   touchableOpacityText: {
      color: '#FFFFFF',
      fontSize: 23,
      textAlign: 'center',
      padding: 8
   },

   textInputStyle: {
      height: 45,
      width: '90%',
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#00B8D4',
      borderRadius: 7,
      marginTop: 15,
      marginBottom: 20,
   },
});