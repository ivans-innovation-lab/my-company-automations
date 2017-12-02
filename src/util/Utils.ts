import { doWithFiles } from "@atomist/automation-client/project/util/projectUtils";
import { VersionedArtifact } from "@atomist/spring-automation/commands/generator/java/JavaProjectParameters";
import { Project } from "@atomist/spring-automation/node_modules/@atomist/automation-client/project/Project";
import { VersionedAggregateArtifact } from "../commands/generator/CommandSideProjectParameters";

export function setReadMe(title: string, description: string, project: Project): Promise<Project> {

    return doWithFiles(project, "README.md", readMe => {
        readMe.setContent("# " + title + " \r\n\r\n" + description);
    });
}
export function doUpdatePom(artifactId: string, groupId: string, scm: string,
                            params: VersionedAggregateArtifact, p: Project): Promise<Project> {

    return updatePom(p, artifactId, groupId, params.version, params.description, scm);
}

function updatePom(
    project: Project,
    artifactId: string,
    groupId: string,
    version: string,
    description: string,
    scm: string,
): Promise<Project> {

    return doWithFiles(project, "pom.xml", f => {
        f.recordReplace(/<artifactId>[\S\s]*?<\/artifactId>/, `<artifactId>${artifactId}</artifactId>`)
            .recordReplace(/<name>[\S\s]*?<\/name>/, `<name>${artifactId}</name>`)
            .recordReplace(/<groupId>[\S\s]*?<\/groupId>/, `<groupId>${groupId}</groupId>`)
            .recordReplace(/<version>[\S\s]*?<\/version>/, `<version>${version}</version>`)
            .recordReplace(/<description>[\S\s]*?<\/description>/, `<description>${description}</description>`)
            .recordReplace(/<connection>[\S\s]*?<\/connection>/, `<connection>${scm}</connection>`)
            .recordReplace(/<developerConnection>[\S\s]*?<\/developerConnection>/,
                          `<developerConnection>${scm}</developerConnection>`);
    });
}

export function doUpdateCircleCI(
    oldString: string,
    newString: string,
    project: Project,
): Promise<Project> {

    return doWithFiles(project, ".circleci/config.yml", f => {
        f.replaceAll(`${oldString}`, `${newString}`);
    });
}
