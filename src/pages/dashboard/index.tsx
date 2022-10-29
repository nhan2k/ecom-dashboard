import * as React from 'react'
import ResponsiveGrid from '@features/layout/grid-v2'
import MediaControlCard from '@features/surfaces/card'
import { useGetPokemonByNameQuery } from '@features/redux/services/signup'

interface IDashboard {}

const Dashboard: React.FunctionComponent<IDashboard> = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

  return (
    <ResponsiveGrid>
      <MediaControlCard />
    </ResponsiveGrid>
  )
}

export default Dashboard
