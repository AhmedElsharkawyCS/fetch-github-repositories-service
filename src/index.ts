import { app } from "./app"
import configs from "./config"

const main = async () => {
  app.listen(configs.PORT, () => console.log(`Server running on port ${configs.PORT}`))
}

main()
