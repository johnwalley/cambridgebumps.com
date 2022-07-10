import Head from 'next/head'
import Link from 'next/link'

import { Header } from '@/components/Header'

import { AuthLayout } from '@/components/AuthLayout'
import { Input } from '@/components/Input'
import { Logo } from '@/components/Logo'
import {
  joinEvents,
  read_tg,
  transformData,
  write_ad,
  write_tg,
} from 'bumps-results-tools'
import BumpsChart from 'react-bumps-chart'

const tgResults = `Set,May Bumps
Short,Mays
Gender,Women
Year,2019

Division,J,N,E,D,Ca,Cl,L,G,Cu,T,Pb,Cr,F,H,Ph,SC,Q
Division,TH,K,J2,Dw,M,LC,W,N2,E2,ME,SS,S,Pb2,D2,CC,R,L2
Division,Q2,Ca2,Cl2,TH2,HH,SE,SC2,N3,E3,Pb3,ME2,Dw2,Cr2,H2,J3,Cl3,K2
Division,CH,AR,LC2,SC3,Q3,Ca3,F2,SS2,Cl4,L3,TH3,M2,Pb4,Dw3,E4,H3,Ca4
Division,SE2,CC2,F3,Cu2,R2,T2,J4,G2,D3

Results
ruuuu ruurrrurrruur urruruurruru uuurrrrurrurr rruruuuuurrr
urrurrr uurrruuruuu ruuurrrrrruru rrruurruuuru ruurrruurrrru
ruurru o5uuurrruuur uuuurruuuu rrurrrruuurru uurrruururrrr
rrurrur uuruuuuruu rurruurrurrru rurrurruurrru ruuruuurrrrrr
`

const results = read_tg(tgResults)
const data = joinEvents([transformData(results)], results.set, results.gender)

export default function Latest() {
  return (
    <>
      <Head>
        <title>Latest - Cambridge Bumps</title>
      </Head>
      <Header />

      <main>
        <BumpsChart data={data} />
      </main>
    </>
  )
}
