import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const dataprovinsi = [
    {
        label: "Yogyakarta",
        value: 1
    },
    {
        label: "Bandung",
        value: 2
    },
    {
        label: "Jakarta",
        value: 3
    },
    {
        label: "Semarang",
        value: 4
    },
    {
        label: "Surabaya",
        value: 5
    },
    {
        label: "Solo",
        value: 6
    }
];

const datakota = [
    {
        label: "Bantul",
        value: "Candi Angin"
    },
    {
        label: "Sleman",
        value: "Monumen Meteorit"
    },
    {
        label: "Gunung Kidul",
        value: "Bleduk Kuwu"
    },
    {
        label: "Kulon Progo",
        value: "Api Abadi"
    }
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            provinces: [],
            provinced:undefined,
            cities: [],
            citied:undefined,
        };
    }

    getProvince() {
        return fetch("https://api.rajaongkir.com/starter/province",{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '09767a5239413e88ae05fe6a2cd8ac71',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    provinces: responseJson.rajaongkir.results
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCity() {
        return fetch("https://api.rajaongkir.com/starter/city",{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '09767a5239413e88ae05fe6a2cd8ac71',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    cities: responseJson.rajaongkir.results
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getHarga() {
        provinced = this.state.provinced
        citied = this.state.citied
        if (provinced === 0){
            return 'Pilih Destinasi'
        }
        if (citied === 0){
            return 'Pilih Destinasi'
        }
        if (provinced === citied) {
            return 0
        }
        if (provinced === 1 && citied === 2){
            return 12000
        }if (provinced === 1 && citied === 3){
            return 15000
        }if (provinced === 1 && citied === 4){
            return 20000
        }if (provinced === 1 && citied === 5) {
            return 22000
        }
    }

    // componentWillMount() {
    //     this.getProvince()
    // }

  render() {
        let dataprov = this.state.provinces
        var prov = [];
          for (let i = 0; i < dataprov.length; i++) {
              var elementprov = {};
              var province = dataprov[i].province
              var province_id = dataprov[i].province_id
              elementprov.label = province;
              elementprov.value = province_id
              prov.push(elementprov)
          }
      console.log(this.state.provinced)
      let datacity = this.state.cities
      var cit = [];
      for (let i = 0; i < datacity.length; i++) {
          var elementcity = {};
          var city = datacity[i].province
          var city_id = datacity[i].province_id
          elementcity.label = city;
          elementcity.value = city_id;
          cit.push(elementcity)
      }
      console.log(this.state.citied)
      return (
      <View style={styles.container}>
          <Text>
              Pilih Keberangkatan
          </Text>
          <RNPickerSelect
              placeholder={{
                  label: 'Pilih Provinsi',
                  value: 0,
              }}
              items={dataprovinsi}
              onValueChange={(value) => {
                  this.setState({
                      provinced: value,
                  });
              }}
              style={{ ...pickerSelectStyles }}
              value={this.state.provinced}
              ref={(el) => {
                  this.inputRefs.picker = el;
              }}
          />
          <Text>
              Pilih Tujuan
          </Text>
          <RNPickerSelect
              placeholder={{
                  label: 'Pilih Kota',
                  value: 0,
              }}
              items={dataprovinsi}
              onValueChange={(value) => {
                  this.setState({
                      citied: value,
                  });
              }}
              style={{ ...pickerSelectStyles }}
              value={this.state.citied}
              ref={(el) => {
                  this.inputRefs.picker = el;
              }}
          />
          <Text style={{
              fontSize:16,
              color:'red',
              paddingTop:20}}
          >
              {'Rp.' + this.getHarga()}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
