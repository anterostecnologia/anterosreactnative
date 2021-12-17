import React from "react";
import {Text, useWindowDimensions, View, ScrollView} from "react-native";

export function AnterosNowLine({style, left, width, calculateTopOffset}) {
    const [now, setNow] = React.useState(new Date());

    // move current time line every minute
    React.useEffect(() => {
        let timeout = null;

        const update = () => {
            timeout = setTimeout(() => {
                setNow(new Date());
                update();
            }, 60000);
        };
        update();

        return () => clearTimeout(timeout);
    }, []);

    // validate style props
    if (__DEV__) {
        React.useEffect(() => {
            const allowedDotStyles = ['width', 'height', 'backgroundColor', 'borderRadius', 'zIndex', 'elevation'];
            for (const key in style?.dot) {
                if (!allowedDotStyles.includes(key))
                    console.warn(`Style [${key}] have no effect in dot styles, only the following will have effect: ${allowedDotStyles.join(', ')}`);
            }

            const allowedLineStyles = ['height', 'backgroundColor', 'zIndex', 'elevation'];
            for (const key in style?.line) {
                if (!allowedLineStyles.includes(key))
                    console.warn(`Style [${key}] have no effect in line styles, only the following will have effect: ${allowedLineStyles.join(', ')}`);
            }
        }, []);
    }

    const size = Math.max(style?.dot?.width || 0, style?.dot?.height || 0) || 7;

    return (
        <View style={{
            top: calculateTopOffset(now),
            left: left - size / 2 + 0.5,
            width,
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            {/* Dot */}
            <View style={{
                backgroundColor: style?.dot?.backgroundColor || 'black',
                height: size,
                width: size,
                borderRadius: style?.dot?.hasOwnProperty('borderRadius') ? style?.dot?.borderRadius : size * 2,
                zIndex: style?.dot?.hasOwnProperty('zIndex') ? style?.dot?.zIndex : 6,
                elevation: style?.dot?.hasOwnProperty('elevation') ? style?.dot?.elevation : 0,
            }}/>
            {/* Line */}
            <View style={{
                backgroundColor: style?.line?.backgroundColor || 'black',
                zIndex: style?.line?.hasOwnProperty('zIndex') ? style?.line?.zIndex : 6,
                elevation: style?.line?.hasOwnProperty('elevation') ? style?.line?.elevation : 0,
                height: style?.line?.height || 1,
                width: '100%',
            }}/>
        </View>
    );
};



function dateRangesOverlap(aStart, aEnd, bStart, bEnd) {
    if (aStart <= bStart && bStart <= aEnd)
        return true; // b starts in a
    if (aStart <= bEnd && bEnd <= aEnd)
        return true; // b ends in a
    if (bStart <= aStart && aEnd <= bEnd)
        return true; // a in b
    return false;
}

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const minDiff = (a, b) => Math.floor(Math.abs(b - a) / 1000 / 60);
const daysDiff = (a, b) => Math.floor(Math.abs(b - a) / 1000 / 60 / 60 / 24) || 0;

const shouldRenderHeaders = (columnsAmount, headersEnabled) => headersEnabled === undefined ? columnsAmount > 1 : headersEnabled;

const renderDefaultHeader = day => {
    const date = day.date.getDate();
    const month = day.date.getMonth();
    return `${date < 9 ? '0' + date : date}.${month < 9 ? '0' + month : month}`;
};

const validateRange = ({date, range}) => {
    for (const [key, value] of Object.entries({date, from: range?.from, till: range?.till})) {
        if (value && typeof value !== 'string' && !(value instanceof Date))
            console.error(`Invalid type of property ${key}. Expected nothing, instance of Date or ISO string, got ${value}`);
    }
};

/**
 * Timetable component
 * @param {!Object[]} props.items Matriz de itens a serem renderizados
 * @param {!Function} props.cardComponent Component React usado para renderizar cartões
 * @param {?Date} props.date Atalho para 'faixa' prop, igual a {de: data, até: data}
 * @param {?Date} props.range.from
 * @param {?Date} props.range.till
 *
 * @param {?Object} props.style.container Estilos do contêiner principal
 * @param {?Object} props.style.headerContainer Estilos do contêiner do cabeçalho da coluna
 * @param {?Object} props.style.headerText Estilos de texto do cabeçalho da coluna
 * @param {?Object} props.style.headersContainer Estilos da visualização que envolve todos os contêineres de cabeçalho
 * @param {?Object} props.style.contentContainer Estilos do contêiner de linhas e cartões
 * @param {?Object} props.style.timeContainer Estilos de contêineres de tempo
 * @param {?Object} props.style.time Estilos de texto de tempo
 * @param {?Object} props.style.lines Estilos de visualizações que renderizam linhas
 * @param {?Object} props.style.nowLine.dot Estilos do círculo da linha de 'tempo atual'
 * @param {?Object} props.style.nowLine.line Estilos da linha da linha de 'tempo atual'
 *
 * @param {?Number} props.width Width of whole component
 * @param {?Number} props.timeWidth Width of time containers
 * @param {?Number} props.hourHeight Height of hour row
 * @param {?Number} props.columnWidth Width of day columns
 * @param {?Number} props.columnHeaderHeight Height of the container of column's header
 * @param {?Number} props.linesTopOffset How far the lines are from top border
 * @param {?Number} props.linesLeftInset How far the lines are moved left from time's right border
 * @param {?Number} props.columnHorizontalPadding Space between column borders and column cards
 *
 * @param {?Boolean} props.enableSnapping Ativa o ajuste às colunas na rolagem
 * @param {?Object} props.scrollViewProps Props para ScrollView horizontal
 * @param {?(Function|Boolean)} props.renderHeader Determina se os cabeçalhos devem ser renderizados e como. Por padrão, os cabeçalhos ficam ocultos se houver uma coluna e são exibidos de outra forma. Passe `false` para ocultar cabeçalhos ou passe a função que renderiza o cabeçalho da coluna text `({date, start, end}) => {}` onde `start` e` end` são o início e o fim do dia (coluna)
 * @param {?String} props.startProperty Nome da propriedade que possui a data de início do item
 * @param {?String} props.endProperty Nome da propriedade que possui a data de término do item
 * @param {?Number} props.fromHour Primeira hora do horário
 * @param {?Number} props.toHour Última hora do calendário
 *
 * @returns {JSX.Element}
 */
export function AnterosTimetable(props) {
    __DEV__ && validateRange(props);

    const screenWidth = useWindowDimensions().width;

    const [items, setItems] = React.useState([]);
    const [range, setRange] = React.useState({
        from: new Date(props.date || props.range?.from),
        till: new Date(props.date || props.range?.till),
    });

    const fromHour = props.hasOwnProperty('fromHour') ? props.fromHour : 0;
    const toHour = props.hasOwnProperty('toHour') ? props.toHour : 24;

    const columnDays = React.useMemo(() => {
        const amountOfDays = daysDiff(range.till, range.from) + 1;
        const days = [];

        for (let i = 0; i < amountOfDays; i++) {
            const date = new Date(range.from);
            date.setDate(date.getDate() + i);

            const start = new Date(date);
            start.setHours(fromHour, 0, 0, 0);

            const end = new Date(date);
            end.setHours(toHour - 1, 59, 59, 999);

            days.push({date, start, end});
        }

        return days;
    }, [range.from, range.till, fromHour, toHour]);

    const width = props.hasOwnProperty('width') ? props.width : screenWidth;
    const timeWidth = props.hasOwnProperty('timeWidth') ? props.timeWidth : 50;
    const timeFontSize = props.style?.time?.fontSize || 14;

    const linesTopOffset = props.hasOwnProperty('linesTopOffset') ? props.linesTopOffset : 18;
    const linesLeftInset = props.hasOwnProperty('linesLeftInset') ? props.linesLeftInset : 15;
    const linesLeftOffset = timeWidth - linesLeftInset;

    const hourHeight = props.hasOwnProperty('hourHeight') ? props.hourHeight : 60;
    const minuteHeight = hourHeight / 60;

    const columnWidth = props.hasOwnProperty('columnWidth') ? props.columnWidth : width - (timeWidth - linesLeftInset);
    const columnHeaderHeight = props.hasOwnProperty('columnHeaderHeight') ? props.columnHeaderHeight : hourHeight / 2;

    const columnHorizontalPadding = props.hasOwnProperty('columnHorizontalPadding')
        ? props.columnHorizontalPadding
        : 10;

    const startProperty = props.startProperty || 'startDate';
    const endProperty = props.endProperty || 'endDate';

    /* 
    * Atualizar intervalo na mudança de adereços 
    */
    React.useEffect(() => {
        const from = props.date || props.range?.from;
        const till = props.date || props.range?.till;

        if (!from || !till)
            return;

        if (+(new Date(from)) === +range.from && +(new Date(till)) === +range.till)
            return;

        setRange({from, till});
    }, [props.date, props.range?.from, props.range?.till]);

    /* Calcular cards */
    React.useEffect(() => {
        if (!Array.isArray(props.items))
            return;

        const items = [];

        props.items?.forEach?.((item, dayIndex) => {
            if (typeof item !== "object") {
                __DEV__ && console.warn(`Item de tipo inválido [${typeof item}] fornecido ao AnterosTimeTable, esperado [object]`);
                return;
            }

            for (const {name, value} of [
                {name: 'start', value: item[startProperty]},
                {name: 'end', value: item[endProperty]},
            ]) {
                if (!value || (typeof value !== 'string' && typeof value !== 'object')) {
                    __DEV__ && console.warn(`Data ${name} inválida do item ${JSON.stringify(item)}, string ISO esperada ou objeto Date, obtido ${value}`);
                    return;
                }
            }

            const itemStart = new Date(item[startProperty]);
            const itemEnd = new Date(item[endProperty]);

            const daysTotal = daysDiff(itemStart, itemEnd) + 1;

            columnDays.forEach((columnDay, columnIndex) => {
                if (!dateRangesOverlap(columnDay.start, columnDay.end, itemStart, itemEnd))
                    return;

                const start = Math.max(+columnDay.start, +itemStart); // card de inicio, quer no início da coluna ou hora de início do item, o que for maior
                const end = Math.min(+columnDay.end + 1, +itemEnd); // o card de término no final da coluna ou no tempo de término do item, o que for menor

                const height = minDiff(start, end) * minuteHeight;
                const top = calculateTopOffset(start);
                let width = columnWidth - (columnHorizontalPadding * 2);
                let left = linesLeftOffset + columnIndex * columnWidth + columnHorizontalPadding;

                if (columnIndex === 0) {
                    width = width - linesLeftInset;
                    left = left + linesLeftInset;
                }

                items.push({
                    key: '' + dayIndex + columnIndex + +itemStart + +itemEnd,
                    style: {position: 'absolute', zIndex: 3, width, height, top, left},
                    item,
                    dayIndex: dayIndex + 1,
                    daysTotal,
                });
            });
        });

        setItems(items);
    }, [
        props.items,
        columnDays,
        startProperty,
        endProperty,
        columnWidth,
        columnHorizontalPadding,
        linesLeftOffset,
        linesLeftInset,
        minuteHeight,
    ]);

    const calculateTopOffset = date => {
        const d = new Date(date);
        return (Math.max((d.getHours() - fromHour), 0) * 60 + d.getMinutes()) * minuteHeight + linesTopOffset;
    };

    return (
        <ScrollView
            horizontal={true}
            snapToInterval={props.enableSnapping ? columnWidth : null}
            {...props.scrollViewProps}
        >
            <View style={props.style?.container}>
                <View style={[styles.row, props.style?.headersContainer]}>
                    {shouldRenderHeaders(columnDays.length, !!props.renderHeader) && columnDays.map((day, columnIndex) => (
                        <View key={String(columnIndex)} style={{
                            width: columnWidth,
                            height: columnHeaderHeight,
                            top: linesTopOffset,
                            marginLeft: columnIndex === 0 ? linesLeftOffset : undefined,
                            alignItems: 'center',
                            ...props.style?.headerContainer,
                        }}>
                            <Text style={props.style?.headerText}>
                                {(typeof props.renderHeader === 'function' ? props.renderHeader : renderDefaultHeader)(day)}
                            </Text>
                        </View>
                    ))}
                </View>
                <View style={props.style?.contentContainer}>
                    {/* horas */}
                    {hours.map((hour, rowIndex) => {
                        return hour >= fromHour && hour <= toHour && (
                            <View key={rowIndex} style={styles.row}>
                                <View style={{
                                    position: 'absolute',
                                    zIndex: 2,
                                    top: 9,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 1,
                                    backgroundColor: 'white',
                                    ...props.style?.timeContainer,
                                    width: timeWidth,
                                }}>
                                    <Text style={props.style?.time}>
                                        {(hour > 9 ? '' : '0') + (hour === 24 ? '00' : hour) + ':00'}
                                    </Text>
                                </View>

                                {/* Colunas dia / linha de horas */}
                                {columnDays.map((day, columnIndex) => (
                                    <View key={String(columnIndex)} style={{
                                        width: columnWidth,
                                        height: rowIndex === toHour ? linesTopOffset + timeFontSize / 2 : hourHeight,
                                        top: linesTopOffset,
                                        marginLeft: columnIndex === 0 ? linesLeftOffset : undefined,
                                        borderTopWidth: 1,
                                        borderLeftWidth: rowIndex === toHour ? 0 : 1,
                                        borderRightWidth: columnIndex === columnDays.length - 1 && rowIndex !== toHour ? 1 : 0,
                                        borderColor: 'gray',
                                        ...props.style?.lines,
                                    }}/>
                                ))}
                            </View>
                        );
                    })}

                    <AnterosNowLine
                        style={props.style?.nowLine}
                        calculateTopOffset={calculateTopOffset}
                        left={linesLeftOffset}
                        width={columnWidth * columnDays.length}
                    />

                    {/* Cards */}
                    {!!props.cardComponent && items.map(item => <props.cardComponent {...item}/>)}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = {
    row: {
        flexDirection: 'row',
    },
};
