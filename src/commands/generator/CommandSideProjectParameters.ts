import { Parameter } from "@atomist/automation-client";
import { Parameters } from "@atomist/automation-client/decorators";
import { Project } from "@atomist/automation-client/project/Project";
import { JavaGeneratorParameters } from "@atomist/spring-automation/commands/generator/java/JavaProjectParameters";
import { camelize } from "tslint/lib/utils";
/**
 * Command API parameters.
 */
@Parameters()
export class CommandSideGeneratorParameters extends JavaGeneratorParameters {

    constructor() {
        super();
        this.source.owner = "ivans-innovation-lab";
        this.source.repo = "my-company-blog-domain";
    }
}
