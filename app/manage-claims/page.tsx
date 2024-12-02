import dynamic from 'next/dynamic'

const ClaimManagement = dynamic(() => import('../../components/ClaimManagement'), { ssr: false })

export default function ManageClaimsPage() {
  return <ClaimManagement />
}

