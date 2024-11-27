import {DemoComponent} from "./DemoComponent.jsx";
import {Result} from "postcss";
import {ProfileComponent} from "./ProfileComponent.jsx";


function App() {

  return (
      <>
          <h1 className="text-xl font-bold underline">
              Hello world!

          </h1>
          <DemoComponent/>

          <div>-----------------siblar</div>

          <ProfileComponent/>
      </>
  )
}

export default App
