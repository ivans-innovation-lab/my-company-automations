
import { HandleCommand } from "@atomist/automation-client";
import { AnyProjectEditor } from "@atomist/automation-client/operations/edit/projectEditor";
import { chainEditors } from "@atomist/automation-client/operations/edit/projectEditorOps";
import { generatorHandler } from "@atomist/automation-client/operations/generate/generatorToCommand";
import { ProjectPersister } from "@atomist/automation-client/operations/generate/generatorUtils";
import { GitHubProjectPersister } from "@atomist/automation-client/operations/generate/gitHubProjectPersister";
import { Project } from "@atomist/automation-client/project/Project";
import { inferStructureAndMovePackage } from "@atomist/spring-automation/commands/generator/java/JavaProjectParameters";
import { curry } from "@typed/curry";
import { doUpdateCircleCI, doUpdatePom, setReadMe } from "../../util/Utils";
import { CommandSideGeneratorParameters } from "./CommandSideProjectParameters";

export function commandSideGenerator(projectPersister: ProjectPersister =
    GitHubProjectPersister): HandleCommand<CommandSideGeneratorParameters> {
    return generatorHandler(
        commandSideProjectEditor,
        CommandSideGeneratorParameters,
        "commandSideGenerator",
        {
            intent: "generate command side API",
            tags: ["spring", "axon", "java", "command", "idugalic"],
            projectPersister,
        });
}

function commandSideProjectEditor(params: CommandSideGeneratorParameters): AnyProjectEditor<any> {
    const artifactId: string = "my-company-" + params.aggregateName.toLowerCase() + "-domain";
    const groupId: string = "com.idugalic";
    const readmeDescription: string = "This component processes commands." +
        " Commands are actions which change state in some way." +
        " The execution of these commands results in Events being generated which are persisted by Axon," +
        " and propagated out to other components (possibly on other VMs)." +
        " In event-sourcing, events are the sole records in the system." +
        " They are used by the system to describe and re-build domain aggregates on demand, one event at a time." +
        "\r\n\r\n## Development\r\n\r\nThis project is driven using [Maven][mvn]." +
        "\r\n\r\n[mvn]: https:\/\/maven.apache.org\/\r\n\r\n" +
        "### Run\/Install locally\r\n \r\nMake sure that you have this libraries installed in your local maven repo:" +
        "\r\n\r\n - [my-company-common](https:\/\/github.com\/ivans-innovation-lab\/my-company-common)\r\n\r\n" +
        "```bash\r\n$ .\/mvnw clean install\r\n```\r\n\r\n" +
        "### Run tests\r\n\r\n" +
        "This component comes with some rudimentary tests as a good starting\r\npoint for writing your own." +
        "  Use the following command to execute the\r\ntests using Maven:\r\n\r\n" +
        "```bash\r\n$ .\/mvnw test\r\n```\r\n\r\n---\r\n" +
        "Created by [Ivan Dugalic][idugalic]@[lab][lab].\r\nNeed Help? " +
        " [Join our Slack team][slack].\r\n\r\n" +
        "[idugalic]: http:\/\/idugalic.pro\r\n" +
        "[lab]: http:\/\/lab.idugalic.pro\r\n" +
        "[slack]: https:\/\/communityinviter.com\/apps\/idugalic\/idugalic";

    const scm: string = "scm:git:https://github.com/" + params.target.owner + "/" + params.target.repo + ".git";

    const editors: AnyProjectEditor[] = [
        curry(setReadMe)(artifactId, readmeDescription),
        curry(doUpdatePom)(artifactId, groupId, scm, params),
        curry(doUpdateCircleCI)("my-company-blog-domain", artifactId),
        curry(inferStructureAndMovePackage)(groupId),
    ];
    return chainEditors(...editors);
}
