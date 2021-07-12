import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Diagram = ({
  goal,
  nutrientValue,
  nutrientType,
  unit,
  emoji,
}) => {
  const innerCircleColor = '#FCEFB4';
  const innerBarColor = '#F9DC5B';
  const outerBarColor = '#F8BF0D';
  const [percent, setPercent] = useState(0);
  const [overflowPercent, setOverflowPercent] = useState(0);

  useEffect(() => {
    if (!goal) {
      setPercent(0);
    } else {
      const countPercent = Math.round((nutrientValue / goal) * 100);
      setPercent(countPercent);

      if (countPercent > 100) {
        const overflow = countPercent - 100;
        setOverflowPercent(overflow);
      }
    }
  }, [nutrientValue, goal]);

  return (
    percent > 100
      ? (
        <div style={{ margin: 10, width: 200, height: 200 }}>
          <CircularProgressbarWithChildren
            value={overflowPercent}
            strokeWidth={8}
            styles={buildStyles({
              pathColor: `${outerBarColor}`,
              trailColor: 'transparent',
            })}
          >
            {/* Inner circle width need to be calculated as
                (100 - 2 * strokeWidth)%
                according to the package documentation.
            */}
            <div style={{ width: '84%' }}>
              <CircularProgressbarWithChildren
                value={100}
                background
                styles={buildStyles({
                  backgroundColor: `${innerCircleColor}`,
                  pathColor: `${innerBarColor}`,
                  trailColor: 'transparent',
                })}
              >
                <div style={{ fontSize: 25, marginTop: -4 }}>
                  { nutrientValue }
                  { unit }
                </div>
                <div style={{ fontWeight: 600, fontSize: 20, marginTop: 5 }}>
                  { emoji }
                  {' '}
                  { nutrientType }
                </div>
                <div style={{ fontWeight: 600, fontSize: 30, marginTop: 1 }}>
                  { percent }
                  %
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      ) : (
        <div style={{
          margin: 10,
          width: 150,
          height: 150,
          padding: 25,
        }}
        >
          <CircularProgressbarWithChildren
            value={percent}
            background
            styles={buildStyles({
              backgroundColor: `${innerCircleColor}`,
              pathColor: `${innerBarColor}`,
              trailColor: 'transparent',
            })}
          >
            <div style={{ fontSize: 25, marginTop: -4 }}>
              { nutrientValue }
              { unit }
            </div>
            <div style={{ fontWeight: 600, fontSize: 20, marginTop: 5 }}>
              { emoji }
              {' '}
              { nutrientType }
            </div>
            {goal
              && (
                <div style={{ fontWeight: 600, fontSize: 30, marginTop: 1 }}>
                  { percent }
                  %
                </div>
              )}
          </CircularProgressbarWithChildren>
        </div>
      )
  );
};

Diagram.propTypes = {
  goal: PropTypes.string.isRequired,
  nutrientValue: PropTypes.number.isRequired,
  nutrientType: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  unit: PropTypes.string,
};

Diagram.defaultProps = {
  unit: '',
  emoji: '',
};

export default Diagram;
