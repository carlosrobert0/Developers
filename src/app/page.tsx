import { renderIcon } from '@/utils/renderIcon'

export default function Home() {
  return (
    <main className="w-full h-full bg-gray_100 px-24 flex flex-col items-center justify-start gap-4">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-2xl text-gray_900 font-medium text-center">Devs</h1>
        <div className="flex justify-between gap-4 w-full">
          <button className="bg-blue_300 rounded-md text-white w-fit p-2">
            {renderIcon('add')}
          </button>
          <input
            type="text"
            placeholder="Buscar desenvolvedor"
            className="px-4 rounded-md w-96"
          />
        </div>
      </div>
      <table className="w-[920px] border-separate bg-white rounded-lg border-spacing-4">
        <thead>
          <tr className="text-blue_300">
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th>Nivel</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>Carlos</td>
            <td>M</td>
            <td>24/07/1997</td>
            <td>26</td>
            <td>Futebol</td>
            <td>Pleno</td>
            <td className="flex gap-2 justify-center">
              {renderIcon('edit')}
              {renderIcon('delete')}
            </td>
          </tr>
          <tr>
            <td>Carlos</td>
            <td>M</td>
            <td>24/07/1997</td>
            <td>26</td>
            <td>Futebol</td>
            <td>Pleno</td>
            <td className="flex gap-2 justify-center">
              {renderIcon('edit')}
              {renderIcon('delete')}
            </td>
          </tr>
          <tr>
            <td>Carlos</td>
            <td>M</td>
            <td>24/07/1997</td>
            <td>26</td>
            <td>Futebol</td>
            <td>Pleno</td>
            <td className="flex gap-2 justify-center">
              {renderIcon('edit')}
              {renderIcon('delete')}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
