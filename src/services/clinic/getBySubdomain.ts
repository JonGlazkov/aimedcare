export async function getClinicBySubdomain(subdomain: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clinics/by-subdomain/${subdomain}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const data = await response.json()

  console.log('data', data)
  return data
}
