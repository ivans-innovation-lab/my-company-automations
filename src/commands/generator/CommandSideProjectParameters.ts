import { Parameter } from "@atomist/automation-client";
import { MappedParameters, Parameters } from "@atomist/automation-client/decorators";
import { MappedParameter } from "@atomist/automation-client/Handlers";
import { NewRepoCreationParameters } from "@atomist/automation-client/operations/generate/NewRepoCreationParameters";
import { Project } from "@atomist/automation-client/project/Project";
import { JavaGeneratorParameters } from "@atomist/spring-automation/commands/generator/java/JavaProjectParameters";
import { updatePom } from "@atomist/spring-automation/commands/generator/java/updatePom";
// tslint:disable-next-line:max-line-length
import { BaseSeedDrivenGeneratorParameters } from "@atomist/spring-automation/node_modules/@atomist/automation-client/operations/generate/BaseSeedDrivenGeneratorParameters";
import { SmartParameters } from "@atomist/spring-automation/node_modules/@atomist/automation-client/SmartParameters";
import { camelize } from "tslint/lib/utils";

export interface VersionedAggregateArtifact {

    aggregateName: string;
    version: string;
    description: string;
}
/**
 * Command API parameters.
 */
@Parameters()
export class CommandSideGeneratorParameters extends BaseSeedDrivenGeneratorParameters
    implements SmartParameters, VersionedAggregateArtifact {

    @Parameter({
        displayName: "Aggregate name",
        // tslint:disable-next-line:max-line-length
        description: "Aggragate name that will be used to construct maven artifact identifier: my-company-[aggragateName.toLowerCase]-domain",
        pattern: /^([A-Z][-a-zA-Z0-9_]*)$/,
        // tslint:disable-next-line:max-line-length
        validInput: "a valid aggragate name, which starts with a letter and contains only alphanumeric, -, and _ characters",
        minLength: 1,
        maxLength: 50,
        required: true,
    })
    public aggregateName: string;

    @Parameter({
        displayName: "Version",
        description: "initial version of the project, e.g., 0.1.0-SNAPSHOT",
        pattern: /^.*$/,
        validInput: "a valid semantic version, http://semver.org",
        minLength: 1,
        maxLength: 50,
        required: false,
    })
    public version: string = "0.1.0-SNAPSHOT";

    @Parameter({
        displayName: "Project Description",
        description: "short descriptive text describing the new project",
        pattern: /^.*$/,
        validInput: "free text sentence fragment",
        minLength: 1,
        maxLength: 100,
        required: false,
    })
    public description: string = "Command Side - Aggregate";

    @MappedParameter(MappedParameters.SlackTeam)
    public slackTeam: string;

    constructor() {
        super();
        this.source.owner = "ivans-innovation-lab";
        this.source.repo = "my-company-blog-domain";
    }

    public bindAndValidate() {
        if (!this.aggregateName) {
            this.aggregateName = this.target.repo;
        }
    }
}
