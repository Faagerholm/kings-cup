import {useRouter, Router} from 'next/router'
import CardDeck from '../../components/cardDeck' 
import Layout from '../../components/Layout'

export default () => {
    const router = useRouter()

    return (
        <>
        <Layout>
            <CardDeck deck_id={router.query.id}/>
        </Layout>
        </>
    )
}