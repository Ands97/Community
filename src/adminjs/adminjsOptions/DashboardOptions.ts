import AdminJS, { PageHandler } from "adminjs"
import { Category, Course, Episode, User } from "../../app/models"

interface IDashboardOptions {
    component: string,
    handler: PageHandler
}

class DashBoardOptions {
    private _options: IDashboardOptions = {
        component: AdminJS.bundle("../components/Dashboard"),
        handler: async (req, res, context) => {
            const courses = await Course.count()
            const episodes = await Episode.count()
            const category = await Category.count()
            const standardUsers = await User.count({ where: { role: 'user' } })

            res.json({
                'Cursos': courses,
                'Episódios': episodes,
                'Categorias': category,
                'Usuários': standardUsers
            })
        },
    }

    public getOptions() {
        return this._options
    }
}

export default new DashBoardOptions();
