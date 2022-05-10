export default {
  SharpeRatio: {
    title: '샤프지수 (Sharpe Ratio)',
    desc: [
      '포트폴리오의 위험 대비 초과수익률을 나타내는 지표',
      '샤프 지수가 높을수록 포트폴리오가 효율적임을 의미',
    ],
  },

  Volatility: {
    title: '변동성 (Volatility)',
    desc: [
      '내외부적 요소에 대한 해당 종목 주가의 민감도를 나타내는 지표',
      '변동성이 높을수록 주가의 급격한 상승 및 하락이 잦고, 낮을수록 주가의 움직임이 안정적이다.',
    ],
  }, 
   profileHelp: {
    title: '등급​',
    desc: [
      '픽해주 유저는 포트폴리오 완성, 픽톡, 댓글 활동 등을 통하여 점수를 얻을 수 있습니다.​',
    ],
    desclinetwo: '포트폴리오 완성 시 100점, 픽톡 및 댓글 작성 시 1점으로 합산됩니다.',
  },

  MarketCapitalization: {
    title: '시가총액 (Market Capitalization)',
    desc: [
      '해당 기업이 발행한 보통주의 총 가치',
      '발행 주식 수 * 현재 주가',
      '기업의 채권자와 주주의 몫을 의미하는 기업가치와는 다르게, 시가총액은 주주의 몫 만을 의미한다.',
    ],
    tip: '',
  },

  Beta: {
    title: '베타 (Beta)',
    desc: [
      '시장의 평균 움직임 대비 해당 기업의 주가 움직임의 민감도를 나타내는 지표',
      '코스피 지수가 1% 오를 경우, 베타값이 0.5 인 기업의 주가는 0.5% 상승하며, 베타값이 2인 기업의 주가는 2% 상승한다.',
    ],
    tip:
      '증시 호황 중에는 고베타 전략을 취함으로써 큰 이익이 낼 수 있고, 반대로 불황 시에는 손실이 클 수 있다.',
  },

  DividendYield: {
    title: '배당수익률 (Dividend Yield)',
    desc: [
      '주가 대비 매해 지급 받는 배당금을 나타내는 지표',
      '같은 양의 배당금을 지급하더라도 주가가 상승할 경우 배당수익률은 하락한다.',
    ],
    tip:
      '배당수익률이 높은 기업은 현금흐름이 뛰어나지만, 예상 성장률이 높지 않은 경우가 많다.',
  },

  PER: {
    title: 'PER',
    desc: [
      '주가 / 주당 순이익',
      '주가가 주당 순이익의 몇배에 형성되어 있는지를 나타내는 지표',
      'PER이 20일 경우, 현재 주가를 기업의 순이익으로 회수하기 위해서는 20년이 걸린다.',
    ],
    tip:
      '통상 PER값은 고성장이 예상되는 산업에서는 높게 측정되며 저성장이 예상되는 산업에서는 낮게 측정된다.',
  },

  PBR: {
    title: 'PBR',
    desc: [
      '주가 / 주당 순자산',
      '주가가 주당 순자산의 몇배에 형성되어 있는지를 나타내는 지표',
    ],
    tip:
      '높은 PBR을 띄는 기업은 회계상 장부 가치에 비해 주가가 높다는 것을 의미한다. 또한, 시장은 회사의 비회계적 가치(브랜드 가치, 소비자 충성도 등)를 높게 평가한다는 것으로 볼 수도 있다.',
  },
  PSR: {
    title: 'PSR',
    desc: [
      '주가 / 주당 매출액',
      '주가가 주당 매출액의 몇배에 형성되어 있는지를 나타내는 지표',
      '통상 아직 이익을 창출하지 않아 PER을 활용할 수 없는 기업을 분석할 때 활용한다.',
    ],
    tip:
      'PSR이 낮을수록 시장에서 저평가 되어있다는 걸 의미한다. 그만큼 수익성 혹은 성장성이 기대되지 않는 상태라고도 볼 수 있다.',
  },

  ROE: {
    title: 'ROE',
    desc: [
      "투입한 자기자본이 얼마만큼의 이익을 냈는지를 나타내는 지표로, '(당기순이익 ÷ 자기자본) × 100'의 공식으로 산출된다.",
      "만약 ROE가 10%이면 10억 원의 자본을 투자했을 때 1억 원의 이익을 냈다는 것을 보여준다.​"
    ],
    tip: '따라서 ROE가 높다는 것은 자기자본에 비해 그만큼 당기순이익을 많이 내 효율적인 영업활동을 했다는 뜻이다.​',
  },

  ROA: {
    title: 'ROA',
    desc: [
      '기업의 일정 기간 순이익을 자산총액으로 나누어 계산한 수치로, 특정 기업이 자산을 얼마나 효율적으로 운용했느냐를 나타내는 지표',
      '이익 ÷ 총 자본 x 100',
    ],
    tip:
      'ROA는 업계별로 편차가 좀 있기 대문에 ROA를 비교할 때는 같은 업계 내의 같은 업종의 기업끼리 비교해야 한다.​',
  },
  RSI: {
    title: 'RSI',
    desc: [
      '일정 기간 동안의 주가의 유동성과 속도 등을 측정하는 지표이다. 상승 압력과 하락 압력 간의 상대적인 강도를 나타낸다.',
    ],
    tip:
      'RSI 수치가 70% 이상으로 올라갈 경우 과매수권, 30% 이하로 내려갈 경우 과매도권으로 분류된다.',
  },

  MACD: {
    title: 'MACD',
    desc: ['평균적인 주가 흐름과 비교했을 때의 최근 추세를 나타내는 지표'],
    tip:
      'MACD가 높을수록 평소보다 상승률이 상대적으로 높고, 낮을수록 상승률이 낮은 것이다. (12일 내의 상승 흐름이 26일 내의 흐름보다 강할 경우, MACD가 양수를 띈다)',
  },

  MACDSignal: {
    title: 'MACD Signal',
    desc: [
      '평상시 대비 최근의 주가 흐름의 추세를 나타내는 MACD와 그의 평균흐름을 나타내는 Signal을 비교해 잠재적인 진입 및 탈출 지점을 파악할 수 있다.',
      'MACD가 Signal을 상향돌파(골든크로스)할 경우 주가가 상승추세를 보일 확률이 높고, 하향돌파(데드크로스)할 경우 주가가 하락추세를 보일 확률이 높다. 이에 맞추어 골든크로스 시 매수, 데드크로스 시 매도 타이밍을 취하는 전략을 짤 수 있다.',
    ],
  },

  StochasticOscillator: {
    title: 'Stochastic Oscillator',
    desc: [
      '종목의 일정기간 최고가와 최저가 사이의 범위 내 현 주가의 위치를 나타내는 지표',
    ],
  },

  부채비율: {
    title: '부채비율',
    desc: ['기업이 보유한 자산 중 부채가 어느 정도 차지하고 있는가를 나타내는 비율로서, 기업의 재무구조의 건전성을 나타내는데 사용한다.​',
    '부채(debt) 대비 총 자본(asset) 혹은 순 자본(equity)의 비율을 보여주며, 피해주에서는 총 자본(asset)을 분모로 사용한다.​'],
    tip:
      '부채비율을 볼 때 자산의 유형을 눈여겨봐야 한다. 자산에는 유형자산과 무형자산이 있으며, 그중 무형자산의 경우 가치 평가에 주관적일 위험이 크다.​',
  },

  공포탐욕지수: {
    title: '공포 탐욕 지수',
    desc: [
      'CNN머니에서 개발한 지수로서 투자심리를 반영한다. 주가 모멘텀, 주가 강도 등, 7개의 기준을 활용해 시장의 공포심과 낙관의 상대적인 강도를 나타낸다.',
    ],
    tip:
      '지수가 낮을수록 시장의 공포심이 큰 상황이고, 지수가 높을수록 시장의 낙관이 큰 상황이다.',
  },

  영업성과: {
    title: '영업성과',
    desc: [
      '영업 이익 / 매출액',
      '기업의 이익 창출 능력을 분석할 때 가장 흔히 사용하는 지표로, 매출과 영업이익을 비교한 값이다.',
    ],
  },

  이동평균선: {
    title: '이동평균선',
    desc: [
      '특정 기간 주가의 평균값을 나타낸 지표',
      '15일, 30일, 60일, 100일, 200일간의 이동 평균을 비교해 짧은 기간의 이동 평균이 높을수록 최근 상승세가 상대적으로 강했음을 의미한다.',
    ],
  },
};