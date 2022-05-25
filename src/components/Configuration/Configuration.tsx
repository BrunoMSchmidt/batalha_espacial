import { useContext } from "react"
import { Link } from "react-router-dom"
import { useImmer } from "use-immer"
import { ConfigurationContext } from "../../contexts/ConfigurationContext"

const Configuration = () => {
    const [volume, setVolume] = useImmer(0);
    const { configuration, setConfiguration } = useContext<any>(ConfigurationContext);

    function saveConfiguration() {
        setConfiguration((configuration: any) => {
            configuration['volumeMusic'] = volume;
        })
    }

    return (
        <>
            <label>Teste</label>
            <input type="range" min={0} max={100} step={5} onChange={(event) => setVolume(+event.target.value)}/>

            <button onClick={saveConfiguration}>Salvar</button>
            <Link to={"../"}>Voltar</Link>
        </>
    )
}

export { Configuration }