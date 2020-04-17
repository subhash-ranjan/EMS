import React from 'react'
import { View, Platform } from 'react-native'
import { Text } from 'react-native-svg'
import { BarChart, LineChart, Grid, ProgressCircle, XAxis, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

let XAxisTop = 200
if (Platform.OS === 'android') { XAxisTop = 190 } else { XAxisTop = 260 }


export default class BarChartExample extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
        // const node = this.myRef.current
        // ReactDOM.unmountComponentAtNode(node)
    }

    render() {

        let dataRow = this.props.dataRow
        let dataColumn = this.props.dataColumn

        // let arrYAxis = []
        // const maxValueOfY = Math.max(...dataRow)
        // const interval = Math.ceil(maxValueOfY / 12)
        // let len = 12
        // arrYAxis = Array.from({ length: len }, (v = interval, k) => ++k * interval)//.reverse()

        const data = dataRow

        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, dataRow }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                    fontSize={14}
                    fill={value >= CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {value}
                </Text>
            ))
        )

        return (


            <View style={{ flexDirection: 'row', borderWidth: 0, height: '45%', paddingVertical: 20, paddingLeft: 10, paddingRight: 10 }}>


                {/* <YAxis
                    style={{
                        bottom: -10, height: 200,
                        display: 'flex', flexDirection: 'column', justifyContent: 'center'
                    }}

                    data={arrYAxis}
                    contentInset={{ top: 0, bottom: 0 }}
                    spacing={10}
                /> */}

                <BarChart
                    style={{ flex: 1 }}
                    data={dataRow}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={{ top: 20, bottom: 10 }}
                    spacing={1}
                    gridMin={0}>


                    <Grid direction={Grid.Direction.HORIZONTAL} />
                    <Labels />


                    <XAxis
                        style={{ top: XAxisTop }}
                        data={dataColumn}
                        scale={scale.scaleBand}
                        formatLabel={(_, index) => dataColumn[index]}
                        labelStyle={{ color: 'black' }}
                    />
                </BarChart>


            </View>


        )
    }
}
