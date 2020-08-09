import React, { Component , Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Leaflet from 'leaflet'
import { Map, TileLayer, Marker , CircleMarker, Popup} from 'react-leaflet'

import format from "date-fns/format"
import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'

import {setSelectedCenter} from '../redux/actions/dataActions'

import {connect} from 'react-redux'

const styles = (theme) => ({
  ...theme.spread,
})

var myIcon = Leaflet.icon({
  iconUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize : [25, 41],
  iconAnchor : [12.5 , 41],
  popupAnchor : [0, -41]
})

class MapLayout extends Component {

  state = {
    lat: 19.075983,
    lng: 72.877655,
    name : ''
  }

  handleClick = (selectedCenterId, selectedCenterName) => {
    let selectedCenter = {
      _id : selectedCenterId,
      name : selectedCenterName          
    }
    this.props.setSelectedCenter(selectedCenter)
  }

  showMarkers(){
    const {vaccineCenters} = this.props.data
    const {dailyStockAndRequests} = this.props.data
    const {selectedDate} = this.props.data

    // filter out total stock and requests for the selected date
    let dailyStockAndRequestsFiltered = dailyStockAndRequests.filter( (dsr) => {
      let dt_ = dsr.date.split("T")
      let dt__ = dt_[0]
      let dtFinal = dt__.split("-")
      return getDate(selectedDate) === Number(dtFinal[2]) & getMonth(selectedDate)+1 === Number(dtFinal[1]) & getYear(selectedDate) === Number(dtFinal[0])
    })
    
    // console.log(dailyStockAndRequestsFiltered)
    // create location markers for all the vaccine centers
    const rows = [] 
    rows.push(
      vaccineCenters.map(vaccineCenter => 
      <Fragment>
        <Marker key={vaccineCenter._id} name="marker" onClick ={() => this.handleClick(vaccineCenter._id, vaccineCenter.name )} position={[vaccineCenter.latitude, vaccineCenter.longitude ]} icon={myIcon} >
          <Popup>
            <div>Total Stock : {dailyStockAndRequestsFiltered.filter(dsrf => {return dsrf.vaccineCenterId === vaccineCenter._id}).map(data => {return data.stock})[0] | 0}</div>
            <div>Total Request : {dailyStockAndRequestsFiltered.filter(dsrf => {return dsrf.vaccineCenterId === vaccineCenter._id}).map(data => {return data.requests})[0] | 0}</div>
          </Popup>
        </Marker> 
      </Fragment>    
      )
    )
    return (
      <Fragment>{rows}</Fragment>
    )
  }

  render() {
    const {selectedDate} = this.props.data
    let selDate = format(selectedDate, 'do') +" "+ format(selectedDate, 'MMM') +" "+ format(selectedDate, 'yyyy') 
    return (
      <Fragment>
        {/* map titles */}
        <div>
          {Object.keys(this.props.data.selectedCenter).length === 0 ? "Please selected the nearest vaccine center" 
          :  this.props.data.selectedCenter.name}
        </div>
        <div> 
          Showing vaccine availability for : {selDate} 
        </div>

        {/* actual map */}
        <Map style={{height: '60vh'}} center={[this.state.lat, this.state.lng]} zoom={10}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* showing location markers on map */}
          {this.showMarkers()}

          <CircleMarker center={[51.51, -0.12]} color="white" radius={5}>
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker>
        </Map>
      </Fragment>
      
    )
  }
}

const mapStateToProps = (state) => ({
  data : state.data,
  ui : state.ui
})

export default  connect(mapStateToProps, {setSelectedCenter})(withStyles(styles)(MapLayout))