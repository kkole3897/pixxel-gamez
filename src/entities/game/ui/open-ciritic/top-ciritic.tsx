import { useScoreFormat, useScoreRadial } from './use-score';
import * as styles from './styles.css';
import type { OpenCriticTier } from '../../model';
import { assignInlineVarsServer } from '@/shared/lib/vanilla-extract/dynamic';

export default function TopCritic({
  score,
  tier,
}: {
  score: number;
  tier: OpenCriticTier;
}) {
  const { scoreText } = useScoreFormat(score);
  const { dashArray, transform } = useScoreRadial(score);

  return (
    <div className={styles.container}>
      <div className={styles.outerOrb}></div>
      <svg
        viewBox="0 0 32 32"
        width={38}
        height={38}
        className={styles.radial}
        style={assignInlineVarsServer({
          [styles.radialTransform]: transform,
        })}
      >
        <circle
          r="16"
          cx="16"
          cy="16"
          stroke="#2e2e2e"
          strokeWidth="32"
          className={styles.colorCircle[tier]}
          style={assignInlineVarsServer({
            [styles.circleDashArray]: dashArray,
          })}
        ></circle>
      </svg>
      <div className={styles.innerOrb}>{scoreText}</div>
    </div>
  );
}
