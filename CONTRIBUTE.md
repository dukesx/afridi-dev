## Contribution Guidelines

#### Commit Messages

- Should be Based on Conventional Commits/Angular (feat/fix/chore/breaking)
- Make sure to SIGN-OFF your commits or DCO check will fail and we won't be able to merge the PR.

#### Branch Choices

- Commits and pull requests are only accepted towards branches suffixed with
  - -fix\* (to show that you have a vulnerability/bug solution)
    - For e.g header-fix, bug-fix, collapse-fix
  - -feature\*
    - For e.g google-auth-feature, animation-feature
- DONOT seed commits towards Dev or Major/Minor version branches. We will merge changes into these branches after review.

#### Issue Labels

You have following available labels, use of any other tags will only confuse the team, so please avoid using.

- Vulnerability
- Bug
- Proposal (for proposing architectural/design pattern changes, i.e MAJOR changes with full Explanation and documentation from YOUR side)
- Enhancement
- Ready for Review (PR is Ready/Edited from your side)
- Documentation

#### Contribution Process

- First make sure you open an issue with relevant label, such as if it is a vulnerability report, tag it with "vulnerability" label.
- If you have a fix, create a PR with your branch (branch name --> e.g {bugname}-fix) and reference it inside the issue comment. Then add the proposal tag to it to show that you have a solution as well.
- The Team will test the branch, review the code and get back to the issue.
- If the issue is relevant, it will be marked with either "approved" or with "needs more approvals" or "Changes requested" or if the PR gets merged successfully, it will be marked as "merged".
