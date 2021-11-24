import { Children, cloneElement, PureComponent } from 'react';
import { ART } from 'react-native'
import * as helper from './AnterosChartSparklineHelper'

const makeCircle = (props) => `
  M${props.cx - props.r} ${props.cy}
  A${props.r} ${props.r} 0 0 0 ${props.cx + props.r} ${props.cy}
  A${props.r} ${props.r} 0 0 0 ${props.cx - props.r} ${props.cy}
  Z
`

const makeRect = (props) => `
  M${props.x} ${props.y}
  H${props.x + props.width}
  V${props.y + props.height}
  H${props.x}
  Z
`

const makeLine = (points) =>
  points.reduce(
    // prettier-ignore
    (path, p, idx) => idx === 0
      ? path.moveTo(p.x, p.y)
      : path.lineTo(p.x, p.y),
    new ART.Path()
  )

function createScale (
    xs,
    ys
  ) {
    const [y0, y1] = ys
  
    const sameX = xs[0] === xs[1]
    const x0 = sameX ? xs[0] - 1 : xs[0]
    const x1 = sameX ? xs[1] + 1 : xs[1]
  
    const slope = (y1 - y0) / (x1 - x0)
    const intercept = y0 - slope * x0
  
    return function (x) {
      return slope * x + intercept
    }
  }


const createHelpers = ({
  data,
  width,
  height,
  padding,
  max = helper.max(data),
  min = helper.min(data)
}) => {
  // prettier-ignore
  const scaleX = createScale(
    [0, data.length - 1],
    [padding, width - padding]
  )

  // prettier-ignore
  const scaleY = createScale(
    [min, max],
    [height - padding, padding]
  )

  const points = data.map((d, i) => ({
    x: scaleX(i),
    y: scaleY(d)
  }))

  return {
    scaleX,
    scaleY,
    points
  }
}



const AnterosChartSparkline = ({ children, ...props }) => {
  const helpers = createHelpers(props)

  return (
    // prettier-ignore
    <ART.Surface
      width={props.width}
      height={props.height}
      style={props.style}
    >
      {Children.map(children, child =>
        cloneElement(child, {
          ...props,
          ...child.props,
          ...helpers
        })
      )}
    </ART.Surface>
  );
}

AnterosChartSparkline.defaultProps = {
  color: '#48d',
  strokeWidth: 1,
  opacity: 0.1,
  width: 240,
  height: 60,
  padding: 4,
  sampling: 8
}


const Spots = ({ color, stroke, strokeWidth, ...props }) => (
    <ART.Shape
      stroke={stroke || color}
      strokeWidth={strokeWidth}
      d={helper.sample(props.points, props.sampling)
        .map(({ x, y }) =>
          makeCircle({
            cx: x,
            cy: y,
            r: 2
          })
        )
        .join()}
    />
  )

  const Line = ({ points, color, stroke, strokeWidth }) => (
    <ART.Shape
      stroke={stroke || color}
      strokeWidth={strokeWidth}
      d={makeLine(points)}
    />
  )


  const makeGuide = ({ data, where, scaleY, padding, width }) => {
    const level = typeof where !== 'number' ? helper[where](data) : where
    return `M${padding} ${scaleY(level)} H${width - padding}`
  }
  
  const Guide = ({ color, stroke, strokeWidth, ...props }) => (
    <ART.Shape
      stroke={stroke || color}
      strokeWidth={strokeWidth}
      d={makeGuide(props)}
    />
  )
  
  Guide.defaultProps = {
    where: 'mean'
  }


  const makeFill = ({ points, height, padding }) => {
    const last = points[points.length - 1]
    return (
      last &&
      makeLine(points)
        .lineTo(last.x, height - padding)
        .lineTo(padding, height - padding)
        .close()
    )
  }

  const Fill = ({ color, fill, opacity, ...props }) => (
    <ART.Shape fill={fill || color} opacity={opacity} d={makeFill(props)} />
  )


  const Band = ({
    data,
    scaleY,
    padding,
    width,
    color,
    fill,
    opacity
  }) => {
    const max = helper.max(data)
    const min = helper.min(data)
    const half = (max - min) / 2
    const high = max - half / 2
  
    return (
      <ART.Shape
        fill={fill || color}
        opacity={opacity}
        d={makeRect({
          x: padding,
          y: scaleY(high),
          width: width - 2 * padding,
          height: scaleY(half)
        })}
      />
    )
  }


  AnterosChartSparkline.Line = Line;
  AnterosChartSparkline.Fill = Fill;
  AnterosChartSparkline.Band = Band;
  AnterosChartSparkline.Guide = Guide;
  AnterosChartSparkline.Spots = Spots;

  export {AnterosChartSparkline};