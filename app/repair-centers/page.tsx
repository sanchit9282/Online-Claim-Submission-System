import dynamic from 'next/dynamic'

const RepairCenters = dynamic(() => import('../../components/RepairCenters'), { ssr: false })

export default function RepairCentersPage() {
  return <RepairCenters />
}

