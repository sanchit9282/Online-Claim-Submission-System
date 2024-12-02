import dynamic from 'next/dynamic'

const ClaimSubmission = dynamic(() => import('../../components/ClaimSubmission'), { ssr: false })

export default function SubmitClaimPage() {
  return <ClaimSubmission />
}

